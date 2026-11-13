---
layout: page
title: Publications
subtitle: Nick Karnesis
---

Below a list of publications for the last couple of years. For a complete list you can click [here](https://scholar.google.com/citations?user=HK9PpqUAAAAJ&hl=en&oi=ao) or [here](https://inspirehep.net/authors/1905896?ui-citation-summary=true), or click the relevant button in the footer.

{% comment %} Show the last 4 years, computed at build time {% endcomment %}
{% assign this_year = site.time | date: "%Y" | plus: 0 %}
{% assign pub_years = "" %}
{% for i in (0..3) %}{% assign y = this_year | minus: i %}{% assign pub_years = pub_years | append: y | append: ";" %}{% endfor %}
{% include publications link=true year=pub_years %}
