## Props
<% _.forEach(c.props, function(prop, propName) { %>
### <%= propName %>
- required: <%= prop.required %>
- type: <%= prop.type.name %> <% if (prop.type.value && prop.type.value.name) { %><%= prop.type.value.name %><% } %>
<% if(prop.defaultValue) { %>
- defaultValue: `<%=prop.defaultValue.value.replace(/\n/g,' ')%>` 
<% } %>
<% if (prop.type.value && prop.type.value.name && prop.type.value.name==="shape" && prop.type.value.value) {%>
- shape
    <% _.forEach(prop.type.value.value, function(prop1,propName1){ %> 
     - `<%= propName1 %>`
        - required: <%= prop1.required%>
        - type: <%= prop1.name%>
    <% }) %>
<% } %>
<% }); %>