$("document").ready(()=>{
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
            body.set("travel_period",body.get("travel_period")+field.val());
        }
        else{
            body.append(title,field.val());
        }
        return true;
       
    }
    let validated = true;
    let body = new FormData();
    const config =  { headers: { 'Content-Type': 'multipart/form-data' } };
    const data = ["title","travel-period-from","travel-period-to","country","price","description"];
    data.every(focus);
    $("#submit").click(()=>{
        data.every(clear);
        data.every(validate);
        if($("#image")[0].files[0] == undefined){
            validated = false;
            $("#image").css("border-bottom","1px solid red");
        }
        console.log($("#image")[0].files[0]);
        if(!validated){
            M.toast({html: 'Please fill in all fields!'});
        }
        else{
            data.every(appendForm);
            body.append("upload",$("#image")[0].files[0])
            axios.post("http://127.0.0.1:3000/travel",body,config).then((response)=>{
                M.toast({html: "Added travel listing!"});
                $("#travel").trigger("reset");
            })
        }
    })

   
})