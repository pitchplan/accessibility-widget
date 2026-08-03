import { useLayoutEffect, useRef, useState } from "react";
import {
  getComputedStyleAndSetAccDataFontSize,
  isRuleAppliedToElement,
} from "../utils";
import { APP_ID, PORTAL_APP_ID, textTags } from "../constants";

/**
 * Rich-text editors own their DOM and watch it - so we scale them from OUTSIDE.
 *
 * ProseMirror, TipTap, Quill, Lexical, Slate and CKEditor all keep their own
 * MutationObserver over their `contenteditable`, so they can reconcile changes
 * they did not make. Writing an attribute onto a node inside one is therefore
 * not a passive annotation: the editor answers by re-rendering that part of its
 * document, which adds nodes, which brings us straight back here. Two
 * observers, each behaving exactly as designed, deadlock the tab - and the
 * freeze is hard enough that the console never flushes and no debugger can
 * attach, so it presents as "the page does not load".
 *
 * The answer is NOT to leave editors alone. That would make the one place a
 * user actually writes the least accessible surface on the page, and for
 * somebody who needs larger text it is the difference between being able to do
 * their job and not.
 *
 * `font-size` inherits, so one value on the editor's host enlarges every word
 * inside it. We therefore scale editors ONCE from the outside instead of
 * thousands of times from the inside - same result for the reader, no mutation
 * the editor is watching.
 */
const EDITABLE_ROOT_SELECTOR = "[contenteditable=true], [contenteditable='']";

/**
 * The editor host this node belongs to, or null for ordinary page content.
 * `closest` walks up through the editor's internals to the contenteditable
 * root, which is exactly the boundary that must not be crossed.
 */
const editableRootOf = (node: HTMLElement): HTMLElement | null =>
  node.closest<HTMLElement>(EDITABLE_ROOT_SELECTOR);

/**
 * Mark an editor for scaling - once per editor, never per node.
 *
 * The mark goes on the host's PARENT where there is one, because the parent
 * sits outside the contenteditable: even this single write then stays clear of
 * what the editor observes, and the size still inherits into the document.
 */
const markEditableHost = (root: HTMLElement) => {
  const target = root.parentElement ?? root;
  if (target.dataset.accOrgfontsize) return;
  getComputedStyleAndSetAccDataFontSize(target);
  target.dataset.accMutation = `true`;
};

const useFontSizeMutationObserver = () => {
  const [nodeListUpdated, setNodeListUpdated] = useState(0);

  /**
   * Raised at most once per frame, and deliberately NOT a dependency below.
   *
   * The previous version listed `nodeListUpdated` in the same effect that set
   * it, so every annotated node tore the observer down and built a new one -
   * on a large page, thousands of times in a single frame. Consumers still
   * re-run their scaling once per batch of DOM changes, which is all they
   * ever needed.
   */
  const pending = useRef(false);
  const bump = () => {
    if (pending.current) return;
    pending.current = true;
    requestAnimationFrame(() => {
      pending.current = false;
      setNodeListUpdated((p) => p + 1);
    });
  };

  useLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {

          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.id === PORTAL_APP_ID || node.id === APP_ID) return;

              // Inside an editor: scale its host once, touch nothing else.
              // Annotating the node itself starts the loop described above.
              const editableRoot = editableRootOf(node);
              if (editableRoot) {
                markEditableHost(editableRoot);
                bump();
                return;
              }

              // handle inline font size
              if (node.style.fontSize) {
                getComputedStyleAndSetAccDataFontSize(node);
                node.dataset.accMutation = `true`;
                bump();
              }
              // handle font size from css files
              Array.from(document.styleSheets).forEach((sheet) => {
                try {
                  Array.from(sheet.cssRules || []).forEach((rule) => {
                    const _rule = rule as CSSStyleRule;
                    if (
                      _rule.style.fontSize &&
                      isRuleAppliedToElement(node, _rule)
                    ) {
                      getComputedStyleAndSetAccDataFontSize(node);
                      node.dataset.accMutation = `true`;
                      bump();
                    }
                  });
                } catch (error) {
                  //
                }
              });
              // handle textTags that the font size was not defined
              if (node) {
                const tag = node.tagName.toLowerCase();
                if (textTags.includes(tag)) {
                  getComputedStyleAndSetAccDataFontSize(node);
                  node.dataset.accMutation = `true`;
                  bump();
                }
              }
            }
          });
        }
      });
    });

    // An editor already on the page when the widget mounts never passes
    // through the callback - nothing was "added" - so it would stay unscalable
    // until the user typed. Marked here instead.
    document
      .querySelectorAll<HTMLElement>(EDITABLE_ROOT_SELECTOR)
      .forEach(markEditableHost);

    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);

  return nodeListUpdated;
};

export default useFontSizeMutationObserver;
