<h2 id="publications" style="margin: 2px 0px -15px;">Publications</h2>

<div class="publications">
<ol class="bibliography">

{% for link in site.data.publications.main %}

{% assign has_image = false %}
{% if link.image and link.image != "" %}
{% assign has_image = true %}
{% endif %}

<li>
<div class="pub-row{% unless has_image %} pub-row-no-image{% endunless %}">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if has_image %}
    {% capture teaser %}
    {% if link.image_viewbox %}
    {% assign crop = link.image_viewbox | split: ' ' %}
    <svg class="teaser teaser-crop img-fluid z-depth-1" viewBox="{{ link.image_viewbox }}" role="img" aria-label="{{ link.title | strip_html | escape }}">
      <defs>
        <clipPath id="pub-teaser-crop-{{ forloop.index }}">
          <rect x="{{ crop[0] }}" y="{{ crop[1] }}" width="{{ crop[2] }}" height="{{ crop[3] }}" />
        </clipPath>
      </defs>
      <image href="{{ link.image }}" width="{{ link.image_width }}" height="{{ link.image_height }}" clip-path="url(#pub-teaser-crop-{{ forloop.index }})" />
    </svg>
    {% else %}
    <img src="{{ link.image }}" alt="{{ link.title | strip_html | escape }}" loading="lazy" style="max-width: 100%;" class="teaser{% if link.image_fit == 'contain' or link.image_fit == nil or link.image_fit == '' %} teaser-contain{% endif %} img-fluid z-depth-1">
    {% endif %}
    {% endcapture %}
    <a href="#" class="project-modal-trigger" data-project-id="pub-{{ forloop.index }}" aria-haspopup="dialog" aria-controls="project-modal">{{ teaser }}</a>
    {% endif %}
    {% if link.conference_short %}
    <abbr class="badge">{{ link.conference_short }}</abbr>
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title">
        {% if link.details %}
        <a href="#" class="project-modal-trigger" data-project-id="pub-{{ forloop.index }}">{{ link.title }}</a>
        {% else %}
        <a href="{{ link.pdf | default: link.doi }}">{{ link.title }}</a>
        {% endif %}
      </div>
      {% if link.details or has_image %}
      <template id="pub-{{ forloop.index }}-content">
        <h2 class="modal-title">{{ link.title }}</h2>
        {% if link.details %}
        {% if link.details.images_first %}
        {% for img in link.details.images %}
        <figure class="modal-figure">
          <img src="{{ img.url }}" alt="{{ img.caption }}">
          {% if img.caption %}<figcaption>{{ img.caption }}</figcaption>{% endif %}
        </figure>
        {% endfor %}
        {% endif %}
        {% if link.details.description %}
        <div class="modal-description">{{ link.details.description }}</div>
        {% endif %}
        {% unless link.details.images_first %}
        {% for img in link.details.images %}
        <figure class="modal-figure">
          <img src="{{ img.url }}" alt="{{ img.caption }}">
          {% if img.caption %}<figcaption>{{ img.caption }}</figcaption>{% endif %}
        </figure>
        {% endfor %}
        {% endunless %}
        {% for vid in link.details.videos %}
        <figure class="modal-figure">
          {% if vid.type == "video/mp4" %}
          <video controls preload="metadata">
            <source src="{{ vid.url }}" type="{{ vid.type }}">
            Your browser does not support the video tag.
          </video>
          {% else %}
          <iframe src="{{ vid.url }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          {% endif %}
          {% if vid.caption %}<figcaption>{{ vid.caption }}</figcaption>{% endif %}
        </figure>
        {% endfor %}
        {% else %}
        <div class="modal-description">
          {% if link.description and link.description != "" %}
          <p>{{ link.description | escape }}</p>
          {% endif %}
          <p>{{ link.authors }}</p>
          <p><em>{{ link.conference }}</em></p>
          {% if link.notes and link.notes != "" %}
          <p><strong>{{ link.notes }}</strong></p>
          {% endif %}
          {% if link.doi and link.doi != "" %}
          <p><a href="{{ link.doi }}" target="_blank" rel="noopener">DOI</a></p>
          {% endif %}
          {% if link.pdf and link.pdf != "" %}
          <p><a href="{{ link.pdf }}" target="_blank" rel="noopener">PDF</a></p>
          {% endif %}
        </div>
        <figure class="modal-figure">
          <img src="{{ link.image }}" alt="{{ link.title | strip_html | escape }}">
        </figure>
        {% endif %}
      </template>
      {% endif %}
      <div class="author">{{ link.authors }}</div>
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
    <div class="links">
      {% if link.doi %}
      <a href="{{ link.doi }}" class="btn btn-sm z-depth-0" role="button" target="_blank" rel="noopener" style="font-size:12px;">DOI</a>
      {% endif %}
      {% if link.pdf %}
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %}
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page %}
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.bibtex %}
      <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTex</a>
      {% endif %}
    </div>
    <div class="publication-notes">
      {% if link.notes %}
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
    </div>
    <div class="others">
      {% if link.others %}
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>

{% endfor %}

</ol>
</div>
