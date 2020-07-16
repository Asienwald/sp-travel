let validated = true;
let body = new FormData();
const config =  { headers: { 'Content-Type': 'multipart/form-data' } };
const data = ["title","travel-period-from","travel-period-to","country","price","description"];
const itinerary_data = ["day","activity"]
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

const fill_form = (data)=>{
    $(`#title`).trigger("focus").val(data.title);
    $(`#travel-period-from`).trigger("focus").val(data.travel_period.split("-")[0])
    $(`#travel-period-to`).trigger("focus").val(data.travel_period.split("-")[1])
    $(`#country`).trigger("focus").val(data.country);
    $(`#price`).trigger("focus").val(data.price);
    $(`#description`).trigger("focus").val(data.description);
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
    fill_form: fill_form
}