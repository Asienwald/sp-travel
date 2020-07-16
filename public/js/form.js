let validated = true;
let body = new FormData();
const config =  { headers: { 'Content-Type': 'multipart/form-data' } };
const data = ["title","travel-period-from","travel-period-to","country","price","description"];
const validate = (title)=>{
    const field = $(`#${title}`);
    if(field.val().trim() == ""){
        validated = false;
        field.css("border-bottom","1px solid red");
    }
    return true
}
const clear = (title)=>{
    const field = $(`#${title}`);
    field.attr("style","");
    return true;
}
const focus = (title)=>{
    $(`#${title}`).focus(()=>{
        clear(title);
    })
    return true;
}
const appendForm = (title)=>{
    console.log(title);
    const field = $(`#${title}`);
    if(title == "travel-period-from"){
        body.set("travel_period",field.val());
    }
    else if(title == "travel-period-to"){
        body.set("travel_period",`${body.get("travel_period")} - ${field.val()}`);
    }
    else{
        body.append(title,field.val());
    }
    return true;
   
}

exports = {
    validated: true,
    body: body,
    config: config,
    data: data,
    validate: validate,
    clear: clear,
    focus: focus,
    appendForm: appendForm,

}