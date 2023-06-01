<p>Want to experiment with Single Directory Components? Follow these steps to quickly get a component up and running.</p>

<h2>Be on Drupal 10.1 or later</h2>

<p>Single Directory Components is only available on Drupal 10.1 or later</p>

<h2>Enable the&nbsp;<em>Single Directory Components</em>&nbsp;module</h2>

<p>Enable the Single Directory Components module at <strong>admin/modules.</strong></p>

<h2>Enable the Olivero theme as default</h2>

<p>This quick start may work on other themes, but it's tested on Olivero.</p>

<p>This can be done at <strong>admin/appearance</strong>.</p>

<h2>Create directory structure</h2>

<p>Within the core/themes/olivero directory</p>

<ol>
	<li>Create a directory called <code class="language-php">components</code></li>
	<li>Create a subdirectory called <code class="language-php">card</code></li>
	<li>Create a subdirectory within <code class="language-php">card</code>called <code class="language-php">images</code></li>
</ol>

<h2>Create and populate your metadata file</h2>

<p>Within the card directory, create a file called <code class="language-php">card.component.yml</code></p>

<p>Within this file, paste the following code:</p>

<pre>
<code class="language-php language-yaml">name: Card
props:
  type: object
  required:
    - attributes
    - content_attributes
    - classes
    - url
    - label
    - title_element
    - content
  properties:
    attributes:
      type: Drupal\Core\Template\Attribute
    content_attributes:
      type: Drupal\Core\Template\Attribute
    classes:
      type: array
    title_prefix:
      type: array
    title_suffix:
      type: array
    url:
      type: string
    label:
      type: string
    title_element:
      type: string
    image:
      type: object
    content:
      type: object
slots:
  card_content: {}
libraryOverrides:
  dependencies:
    - core/drupal
    - core/once
</code></pre>

<h2>Create and populate the template file</h2>

<p>Within the <code class="language-php">card</code> directory, create a file called <code class="language-php">card.twig</code></p>

<p>Within this file, paste the following code:</p>

<pre>
<code class="language-html language-php">&lt;article {{ attributes.addClass(classes).addClass('card').removeClass('node--view-mode-teaser') }}&gt;
  {{ title_prefix }}
  {{ title_suffix }}
  &lt;div class="card__inner"&gt;
    {% if image %}
      &lt;div class="card__top"&gt; {{ image }}&lt;/div&gt;
    {% endif %}
    &lt;div {{ content_attributes.addClass('card__bottom') }}&gt;
      &lt;a href="{{ url }}"&gt;
        &lt;{{ title_element }} class="card__title"&gt;
          {{ label }}
        &lt;/{{ title_element }}&gt;
      &lt;/a&gt;
      {% block card_content %}{% endblock %}
    &lt;/div&gt;
  &lt;/div&gt;

  {# Arrow SVG that appears in the bottom right. #}
  {{ include(componentMetadata.path ~ '/images/arrow.svg' )}}
&lt;/article&gt;
</code></pre>

<h2>Create and populate the CSS file</h2>

<p>Create a file called <code class="language-php">card.css</code> within the <code class="language-php">card</code> directory.&nbsp;</p>

<p>Populate this file with the following code:</p>

<pre>
<code class="language-css language-php">/**
 * @file
 * Example CSS for a card component.
 */

.card {
  --spacing: var(--sp2, 20px);

  position: relative; /* Anchor arrow.svg. */
  border: solid 1px #ccc;
  border-radius: 3px;
  container-type: inline-size;
}

.card__link {
  display: block;
}

.card__inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
}

.card__top img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card__title {
  font-size: 1.5rem;
  margin-block: 0 1rem;
}

.card__bottom {
  padding-block: 0 var(--spacing);
  padding-inline: var(--spacing);
}

.card .arrow {
  position: absolute;
  inset-inline-end: var(--spacing);
  inset-block-end: var(--spacing);
  color: var(--color-text-primary-medium, navy);
}

[dir="rtl"] .card .arrow {
  scale: -1; /* Flip horizontally if RTL */
}

@container (inline-size &gt; 400px) {
  .card__inner {
    flex-direction: row;
  }

  .card__top img {
    height: 100%;
    aspect-ratio: revert;
  }

  .card__top {
    flex-basis: max(150px, 40%);
    flex-shrink: 0;
  }

  .card__top :is(.field, a) {
    display: flex;
    height: 100%;
  }

  .card__bottom {
    padding-block: var(--spacing);
    padding-inline: 0 var(--spacing);
  }
}
</code></pre>

<h2>Create and populate the JavaScript file</h2>

<p>Create a file within the <code class="language-php">card</code> directory called <code class="language-php">card.js</code></p>

<p>Populate this file with the following code:</p>

<pre>
<code class="language-javascript language-php">/**
 * @file
 * Example JavaScript for a card component.
 */

((Drupal, once) =&gt; {
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
</code></pre>

<h2>Create and populate the SVG file</h2>

<p>Create a file within the <code class="language-php">images</code> directory within the <code class="language-php">card</code> directory with the filename of <code class="language-php">arrow.svg</code></p>

<p>Populate this file with the following code:</p>

<pre>
<code class="language-html language-php">&lt;svg class="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"&gt;
&lt;path d="M13.19 6.71503C13.1543 6.62296 13.1008 6.53886 13.0325 6.46753L7.73001 1.16503C7.66008 1.0951 7.57706 1.03963 7.4857 1.00178C7.39433 0.963937 7.29641 0.944458 7.19751 0.944458C7.09862 0.944458 7.00069 0.963937 6.90932 1.00178C6.81796 1.03963 6.73494 1.0951 6.66501 1.16503C6.59508 1.23496 6.53961 1.31797 6.50177 1.40934C6.46392 1.50071 6.44444 1.59863 6.44444 1.69753C6.44444 1.79642 6.46392 1.89435 6.50177 1.98571C6.53961 2.07708 6.59508 2.1601 6.66501 2.23003L10.6925 6.25003H1.5C1.30109 6.25003 1.11032 6.32905 0.96967 6.4697C0.829018 6.61035 0.75 6.80112 0.75 7.00003C0.75 7.19894 0.829018 7.38971 0.96967 7.53036C1.11032 7.67101 1.30109 7.75003 1.5 7.75003H10.6925L6.66501 11.77C6.59471 11.8398 6.53892 11.9227 6.50084 12.0141C6.46277 12.1055 6.44316 12.2035 6.44316 12.3025C6.44316 12.4015 6.46277 12.4996 6.50084 12.591C6.53892 12.6824 6.59471 12.7653 6.66501 12.835C6.73509 12.9045 6.8182 12.9595 6.90958 12.9969C7.00096 13.0342 7.09881 13.0531 7.19751 13.0525C7.29622 13.0531 7.39406 13.0342 7.48544 12.9969C7.57682 12.9595 7.65993 12.9045 7.73001 12.835L13.0325 7.53253C13.1008 7.4612 13.1543 7.37709 13.19 7.28503C13.265 7.10243 13.265 6.89762 13.19 6.71503Z" fill="currentColor"/&gt;
&lt;/svg&gt;
</code></pre>

<h2>Modify the theme's node teaser template to point to the new component</h2>

<p>Open the existing node teaser template at `core/themes/olivero/templates/content/node--teaser.html.twig`. Replace the existing code with the code below:</p>

<pre>
<code class="language-html language-php">{%
  set classes = [
    'node',
    'node--type-' ~ node.bundle|clean_class,
    node.isPromoted() ? 'node--promoted',
    node.isSticky() ? 'node--sticky',
    not node.isPublished() ? 'node--unpublished',
    view_mode ? 'node--view-mode-' ~ view_mode|clean_class,
  ]
%}

{% embed 'olivero:card' with {
    attributes,
    content_attributes,
    classes,
    title_prefix,
    title_suffix,
    url,
    label,
    title_element: title_element ?: 'h2',
    image: content.field_image,
    content,
  } only %}

  {% block card_content %}
    {{ content|without('field_image', 'links') }}
  {% endblock %}

{% endembed %}
</code></pre>

<h2>Clear the cache and populate content</h2>

<ol>
	<li>Clear Drupal's cache at&nbsp;<strong>admin/config/development/performance</strong>.</li>
	<li>If you don't have content created, create an article and ensure the teaser view mode of this article is visible.</li>
	<li>The component should be visible!</li>
</ol>

<p><img alt="" src="/files/card-component.jpg" /></p>
