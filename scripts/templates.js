var templates = {};


templates.userList = [



'<li rel="<%= userName %>" data-itemid="<%= _id %>">',
'<h3 class="userName"><%= userName %></h3>',
'<a class="logout" href="">Log Out</a>',
'</li>'


].join("");



templates.messageTmpl = [
'<li data-itemid="<%= _id %>">',
'<p class="userMessage"><span class="user"><b><%=userName %></span>:</b> <%= userMessage %></p>'


].join("");
