/**
 * @file
 * Example JavaScript for a card component.
 */

((Drupal, once) => {
  function init(el) {
    console.log(Drupal.t(`This element is`), el)
  }

  /**
   * Attaches the comment behavior to comments.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the show/hide behavior for indented comments.
   */
  Drupal.behaviors.comments = {
    attach(context) {
      once('card', '.card', context).forEach(
        init,
      );
    },
  };
})(Drupal, once);
