var templates = {};


templates.userList = [
'<article data-itemid="<%= _id %>">',
'<li>',
'<h3><%= user %></h3>',
'</li>',

].join("");


templates.messageTmpl = [
'<article data-messageid="<%=_id %>">',
'<p><%= message %></p>',

].join("");
