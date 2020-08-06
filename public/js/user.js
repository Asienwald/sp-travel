

$("document").ready(()=>{
    axios.get("/getHeader").then((resp) => {
        console.log("getting header...");
        // console.log(resp);
        $("body").prepend(resp.data);

        // init materialize js components
        $(".modal").modal();
        $(".dropdown-trigger").dropdown({
            coverTrigger: false
          });
        // console.log(resp.data);
        // const loginStatus = ()=>{
        //     if(localStorage.getItem("status") == "yes"){
        //         for(i=0;i<x.length;i++){x[i].style.display="none";}
        //         for(i=0;i<y.length;i++){y[i].style.display="visible";}            
        //     }
        //     else{
        //         for(i=0;i<y.length;i++){y[i].style.display="none";}
        //         for(i=0;i<x.length;i++){x[i].style.display="visible";}
        //     }
        // }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const x = document.getElementsByClassName("signed-out");
        // const y = document.getElementsByClassName("signed-in");
        // console.log(x);
        // console.log(y);
        // loginStatus();
        const config =  { headers: { 'Content-Type': 'multipart/form-data' } };
        $("#login").click(()=>{
            event.preventDefault();
            const email = $("#email-login").val();
            const password = $("#pwd-login").val();
            let body = new FormData();
            body.append( "email",email);
            body.append("password",password);
            if(re.test(email)){
                axios.post("/user/login",body,config).then((response)=>{
                    // localStorage.setItem("status","yes");
                    // if(response.data == "Welcome admin!"){
                    //     // window.location.href = "http://127.0.0.1:3000/admin";
                    // }
                    // else{
                    //     location.reload();
                    // }
                    
                    location.reload();
                }).catch((error)=>{
                    $("#signin-error-msg").text("Wrong username and/or password!");
                })
                return true;
            }
            else{
                $("#signin-error-msg").text("Invalid email!");
            }
            
            
        })
        $("#logout").click(()=>{
            event.preventDefault();
            axios.post("/user/logout",config).then((response)=>{
                // localStorage.clear()
                window.location.href = "/";
            })
        })
        $("#register").submit(()=>{
            event.preventDefault();
            const username = $("#uid").val();
            const email = $("#email").val();
            const password1 = $("#pwd1").val();
            const password2 = $("#pwd2").val();
            let error = false
            if(username.length == 0){
                M.toast({html:"Username cannot be empty!\n"});
                error = true;
            }
            if(!re.test(email)){
                M.toast({html:"Invalid email!\n"});
                error = true;
            }
            if(password1.length == 0){
                M.toast({html:"Password cannot be empty!\n"});
                error = true;
            }
            if(password1 != password2){
                M.toast({html:"Passwords do not match!\n"});
                error = true;
            }
            if(error == false){
                let body = new FormData();
                body.append("username",username);
                body.append("email",email);
                body.append("password",password1);
                axios.post("/users",body,config).then((response)=>{
                    M.toast({html: 'User Added!'})
                    $("#register").trigger("reset");
                })
            }
            
        })
    })
    
})

function login(){
    event.preventDefault();
    const email = $("#email-login").val();
    const password = $("#pwd-login").val();
    let body = new FormData();
    body.append( "email",email);
    body.append("password",password);
    if(re.test(email)){
        axios.post("/user/login",body,config).then((response)=>{
            // localStorage.setItem("status","yes");
            // if(response.data == "Welcome admin!"){
            //     // window.location.href = "http://127.0.0.1:3000/admin";
            // }
            // else{
            //     location.reload();
            // }
            
            location.reload();
        }).catch((error)=>{
            $("#signin-error-msg").text("Wrong username and/or password!");
        })
        return true;
    }
    else{
        $("#signin-error-msg").text("Invalid email!");
    }
}