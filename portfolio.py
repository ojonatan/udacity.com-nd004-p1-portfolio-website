#!/usr/bin/env python
# -*- coding: utf-8 -*

import json
import os
from PIL import Image

template_source = '''{indention}<source srcset="{images}" type="{type}" media="{media}" />
'''

template_picture = '''
{indention}<picture class="portfolio-picture">
{sources}
{indention}{t}<img alt="{alt}" class="image-loading portfolio-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
{indention}</picture>
'''

template_article_single_image = '''
{t}{t}{t}{t}{t}<article class="portfolio-article col-xs-12 col-sm-6 col-lg-4">
{t}{t}{t}{t}{t}{t}<figure>
{picture}
{t}{t}{t}{t}{t}{t}{t}<figcaption>
{t}{t}{t}{t}{t}{t}{t}{t}<h3>{title}</h3>
{t}{t}{t}{t}{t}{t}{t}</figcaption>
{t}{t}{t}{t}{t}{t}</figure>
{t}{t}{t}{t}{t}{t}<p class="portfolio-teaser portfolio-text">{text}</p>
{t}{t}{t}{t}{t}{t}<button class="portfolio-more btn btn-default" data-toggle="modal" data-target="#more-info">Read more...</button>
{t}{t}{t}{t}{t}</article>
'''

template_portfolio_item = '''
{t}{t}{t}{t}{t}{t}{t}<div class="portfolio-item">
{picture}
{t}{t}{t}{t}{t}{t}{t}</div>
'''

template_article_multiple_images = '''
{t}{t}{t}{t}{t}<article class="portfolio-article col-xs-12 col-sm-6 col-lg-4">
{t}{t}{t}{t}{t}{t}<div class="slick-slider">
{portfolio_items}
{t}{t}{t}{t}{t}{t}</div>
{t}{t}{t}{t}{t}{t}<h3>{title}</h3>
{t}{t}{t}{t}{t}{t}<p class="portfolio-teaser portfolio-text">{text}</p>
{t}{t}{t}{t}{t}{t}<button class="portfolio-more btn btn-default" data-toggle="modal" data-target="#more-info">Read more...</button>
{t}{t}{t}{t}{t}</article>
'''

dpr = 2
widths = {
    "small": {
        "width": 320,
        "media": "(max-width: 320px)"
    },
    "medium": {
        "width": 768,
        "media": "(min-width: 321px) and (max-width: 1023px)"
    },
    "large": {
        "width": 1024,
        "media": "(min-width: 1024px)"
    }
}

portfolio_list = json.loads(open("portfolio.json").read())
for portfolio in portfolio_list:
    print portfolio["title"].encode("utf-8").strip()
    portfolio["pictures"] = []
    for image in portfolio["images"]:
        picture = {
            "type": "",
            "sources": {}
        }
        chunks = image.split(".")
        extension = chunks.pop().lower()
        
        if extension == "jpg":
            picture["type"] = "image/jpeg"
            
        if extension == "png":
            picture["type"] = "image/png"
            
        for suffix, details in widths.iteritems():
            images = []
            for i in range(dpr):
                dpr_suffix = i > 0 and "_" + str(i + 1) + "x" or ""
                images.append("public/img/" + ".".join(chunks) + "-" + suffix + dpr_suffix + "." + extension)

            j = 0
            for image_file in images:
                j = j + 1
                with Image.open(image_file) as image_object:
                    image_width, image_height = image_object.size
                    if image_width == (details["width"] * j):

                        if not suffix in picture["sources"]:
                            picture["sources"][suffix] = {
                                "images": ["img/" + os.path.basename(image_file)],
                                "media": details["media"]
                            }
                        else:
                            picture["sources"][suffix]["images"].append("img/" + os.path.basename(image_file) + " " + str(j) + "x")
        
        if not "large" in picture["sources"]:
            if not "medium" in picture["sources"]:
                picture["sources"]["small"]["media"] = ""
            else:
                picture["sources"]["medium"]["media"] = "(min-width: 321px)"
                
        portfolio["pictures"].append(picture)

html_portfolio = ""    
for portfolio in portfolio_list:
    if len(portfolio["pictures"]) > 1:
        html_portfolio_items = ""
        i = 0
        for picture in portfolio["pictures"]:
            i = i + 1
            html_sources = ""
            for source in picture["sources"]:
                html_sources += template_source.format(
                    images=", ".join(picture["sources"][source]["images"]),
                    type=picture["type"],
                    media=picture["sources"][source]["media"],
                    indention="\t\t\t\t\t\t\t\t\t",
                    t="\t"
                )
            
            html_picture = template_picture.format(
                sources=html_sources,
                alt=portfolio["title"].encode("utf-8").strip() + " (" + str(i) + ")",
                indention="\t\t\t\t\t\t\t\t",
                t="\t"
            )

            html_portfolio_items += template_portfolio_item.format(
                picture=html_picture,
                indention="\t\t\t" ,
                t="\t"           
            )

        html_portfolio += template_article_multiple_images.format(
            portfolio_items=html_portfolio_items,
            title=portfolio["title"].encode("utf-8").strip(),
            text=portfolio["text"],
            t="\t"
        )
            
    else:
        html_sources = ""
        for source in portfolio["pictures"][0]["sources"]:
            html_sources += template_source.format(
                images=", ".join(portfolio["pictures"][0]["sources"][source]["images"]),
                type=picture["type"],
                media=picture["sources"][source]["media"],
                indention="\t\t\t\t\t\t\t\t"
            )

        html_picture = template_picture.format(
            sources=html_sources,
            alt=portfolio["title"].encode("utf-8").strip(),
            indention="\t\t\t\t\t\t\t",
            t="\t"
        )
        
        html_portfolio += template_article_single_image.format(
            picture=html_picture,
            title=portfolio["title"].encode("utf-8").strip(),
            text=portfolio["text"],
            t="\t"
        )

index_html = "public/index.html"
template = open(index_html).read()
chunks = template.split("\n<!--- portfolio_marker -->\n");
chunks[1] = html_portfolio;
    
index_file = open(index_html,"w+") 
index_file.write("\n<!--- portfolio_marker -->\n".join(chunks)) 
index_file.close()
