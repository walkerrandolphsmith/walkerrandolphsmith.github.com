---
title: Add Bitbucket Aside to Octopress
template: posts.hbt
postId: 1
date: 2013-07-05
description: Adding Bitbucket repositories to your Octopress blog.
author: Walker Randolph Smith
type: article
public: true
tags: javascript
related: [2]
hero: city.jpg
---

Adding public repositories hosted on Bitbucket to your blog is a great idea to showcase your projects.
Checking out how the Github aside works will help, as they are similar.
However, unlike Github, repository names on Bitbucket can have white space, but the URL to a repository is stripped of white space and every letter is converted to lowercase.

## Update main configuration

In the `_config.yml` add the following lines:

```
# Bitbucket repositories
bitbucket_user: your-user-name
bitbucket_repo_count: 5
bitbucket_show_profile_link: true
bitbucket_skip_forks: true
```


If the view will be added to the sidebar you will also need to add the, yet to exist, bitbucket.html view to the appropriate aside. In this case add the repositories to the default asides.

```
blog_index_asides: [custom/asides/bitbucket.html, asides/github.html]
```


## Add the View

In the previous code block the path preceding bitbucket.html indicates where to make a new html file named bitbucket.

```
{% if site.bitbucket_user %}
<section>
  <h1>Bitbucket Repos</h1>
  <ul id="bb_repos">
    <li class="loading">Status updating...</li>
  </ul>
  {% if site.bitbucket_show_profile_link %}
  <a href="https://bitbucket.org/{{site.bitbucket_user}}">@{{site.bitbucket_user}}</a> on Bitbucket
  {% endif %}

  <script type="text/javascript">
    $.domReady(function(){
        if (!window.jXHR){
            var jxhr = document.createElement('script');
            jxhr.type = 'text/javascript';
            jxhr.src = '{{root_url}}/javascripts/libs/jXHR.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(jxhr, s);
        }

        bitbucket.showRepos({
            user: '{{site.bitbucket_user}}',
            count: {{site.bitbucket_repo_count}},
            target: '#bb_repos'
        });
    });
  </script>
  <script src="{{ root_url }}/javascripts/bitbucket.js" type="text/javascript"> </script>
</section>
{% endif %}
```

The object, bitbucket will be defined in the following script:

```js
var bitbucket = (function() {
    function render(user, target, repos) {
        var i = 0,
            fragment = '',
            t = $(target)[0];

        for (i = 0; i < repos.length; i++) {
            fragment += '<li><a href="https://bitbucket.org/' + user + '/' + repos[i].name.replace(/\s+/g, '-').toLowerCase() + '">' + repos[i].name + '</a><p>' + repos[i].description + '</p></li>';
            console.log(repos[i].name.replace(/\s+/g, '-').toLowerCase())
        }
        t.innerHTML = fragment;
    }
    return {
        showRepos: function(options) {
            var host="api.bitbucket.org/1.0/users/"
            var auth = (options.password) ? (options.user+":"+options.password+"@") : "";

            $.ajax({
                url: "https://"+auth+host+options.user + "?callback=?",
                type: "jsonp",
                error: function(err, status) {
                    $(options.target + ' li.loading').addClass('error').text("Error loading feed");
                },
                success: function(data) {
                    var repos = [];
                    if (!data || !data.repositories) {
                        return;
                    }
                    for (var i = 0; i < data.repositories.length; i++) {
                        if (options.skip_forks && data.repositories[i].is_fork) {
                            continue;
                        }
                        if (options.require_wiki && !data.repositories[i].has_wiki) {
                            continue;
                        }

                        repos.push(data.repositories[i]);
                    }

                    repos.sort(function(a, b) {
                        var aDate = new Date(a.last_updated).valueOf(),
                            bDate = new Date(b.last_updated).valueOf();

                        if (aDate === bDate) {
                            return 0;
                        }
                        return aDate > bDate ? -1 : 1;
                    });

                    if (options.count) {
                        repos.splice(options.count);
                    }

                    render(options.user, options.target, repos);
                }
            });
        }
    };
})();
```

Notice that the anchor tag's href needs to be stripped and lowercased and this does the trick,

```js
repos[i].name.replace(/\s+/g, '-').toLowerCase()
```