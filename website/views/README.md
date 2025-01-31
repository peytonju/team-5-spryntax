### Express Handlebars
"spryntax.js" handles all connections to the site and redirects users to specific pages as specified by the URL they enter.    

### Layouts
Layouts are major sections of our site that has frequently repeating patterns.  
Layouts may be specified in "spryntax.js" based on the URL entered.
May contain Partials and Pages.    

### Pages
Pages are bodies of our site. This is where content is usually placed. Pages are contained in Layouts.  
The page that's loaded is specified in "spryntax.js" based on the URL entered.  
May contain Partials.    

### Partials
Partials are sections of HTML that are used frequently in many places. An example of this is headers and footers.  
These are not specified in "spryntax.js" and are just referenced in Layouts and Pages.