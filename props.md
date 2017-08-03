<%= h4('Props') %>
<% _.forEach(c.props, function(prop, propName) { %>
- <%= propName %>
    - <%= strong('required:') %> <%= prop.required %>
    - <%=strong('type:') %> <%= prop.type.name %> <% if (prop.type.value && prop.type.value.name) { %><%= prop.type.value.name %><% } %>
<% if (prop.type.value && prop.type.value.name && prop.type.value.name==="shape" && prop.type.value.value) {%>
<% _.forEach(prop.type.value.value, function(prop1,propName1){ %> 
        - <%= propName1 %>
            - <%= strong('required:') %> <%= prop1.required%>
            - <%= strong('type:') %> <%= prop1.name%>
<% }) %>
<% } %>
<%= prop.description %>
<% }); %>