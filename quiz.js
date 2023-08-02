//Making Elements 
const start_btn=document.querySelector(".start button");
const info_box=document.querySelector(".info_box");
const exit_btn=info_box.querySelector(".buttons .quit");
const continue_btn=info_box.querySelector(".buttons .restart");
const quiz_box=document.querySelector(".quiz_box");
const timeCount=quiz_box.querySelector(".timer .timer-sec");
const timeline=quiz_box.querySelector("header .time_line");
const timeOff=quiz_box.querySelector("header .time-text");
const option_list=document.querySelector(".option_list");

//Making Logic For The (if start btn has been clicked)
start_btn.onclick=()=>{
    info_box.classList.add("activeInfo");
}

//Making Logic For The (if exit btn has been clicked)
exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
}

//Making Logic For The (if continue btn has been clicked)
continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.add("activeBox");//show the quiz box
    showque(0);
    quecounter(1);
    startTimer(15);
    startTimerline(0);
}

// Getting Questions and Options From Arrays
let que_count=0;
let que_numb= 1;
let counter;
let counterline;
let timevalue=15;
let widthvalue=0;
let userScore =0;

const next_btn=quiz_box.querySelector(".next_btn");
const result_box=document.querySelector(".result_box");
const restart_quiz=result_box.querySelector(".buttons .restart");
const quit_quiz=result_box.querySelector(".buttons .quit");

quit_quiz.onclick=()=>{
    window.location.reload();
}
restart_quiz.onclick=()=>{
    info_box.classList.add("activeInfo");
    result_box.classList.remove("activeResult");
    let que_count=0;
    let que_numb= 1;
    let counter;
    let timevalue=15;
    let widthvalue=0;
    let userScore = 0;
    showque(que_count);
        quecounter(que_numb);
        startTimer(timevalue);
        clearInterval(counter);
        startTimerline(widthvalue);
        clearInterval(counterline);
        next_btn.style.display="none";
        timeOff.textContent="Time Off";

}


//If next button clicked
next_btn.onclick=()=>{
    if(que_count< questions.length - 1){
        que_count++;
        que_numb++;
        showque(que_count);
        quecounter(que_numb);
        startTimer(timevalue);
        clearInterval(counter);
        startTimerline(widthvalue);
        clearInterval(counterline);
        next_btn.style.display="none";
        timeOff.textContent="Time Left";

    }else{
        clearInterval(counter);
        clearInterval(counterline);
        console.log("Questions completed");
        showResultBox();
    }
}

function showque(index){
    const que_text=document.querySelector(".que_text");
    
    let que_tag= '<span>'+ questions[index].numb + "." + questions[index].question +'</span>';
    let option_tag='<div class="option">'+questions[index].options[0]+'<span></span></div>'
                +'<div class="option">'+questions[index].options[1]+'<span> </span></div>'
                +'<div class="option">'+questions[index].options[2]+'<span></span></div>'
                +'<div class="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option=option_list.querySelectorAll(".option");
    for (let i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)")
    }
}

 let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
 let crossIcon = '<div class="icon cross"><i class="fas fa-cross"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterline);
    let userans=answer.textContent;
    let correctans= questions[que_count].answer;
    let alloptions=option_list.children.length;
    

    if(userans==correctans){
        userScore +=1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }else{
        console.log("Answer is wrong");
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",crossIcon);
        //if answers is incorrect then automatically select the correct answer
        for (let i=0;i < alloptions;i++){
            if(option_list.children[i].textContent==correctans){
            option_list.children[i].setAttribute("class","option correct");
            option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }
    //once user selected, disabled all options
    for(let i=0;i<alloptions;i++){
        option_list.children[i].classList.add("disabled");
    } 
    next_btn.style.display="block";
}


function showResultBox(){
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeBox");//hide the quiz box
    result_box.classList.add("activeResult");//show the result box
    const scoreText = result_box.querySelector(".score-text");
    if(userScore > 3){
        let scoreTag='<span>Congrats! You got <p>'+userScore+'</p>out of<p>'+questions.length+'</p></span>'; 
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag='<span>Nice! You got <p>'+userScore+'</p>out of<p>'+questions.length+'</p></span>'; 
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag='<span>You got <p>'+userScore+'</p>out of<p>'+questions.length+'</p></span>'; 
        scoreText.innerHTML = scoreTag;
    }

}




function startTimer(time){
    counter=setInterval(timer,1000);
    function timer(){
        timeCount.textContent=time;
        time--;
        if(time<9){
            let addzero=timeCount.textContent;
            timeCount.textContent="0"+addzero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent="00";
            timeOff.textContent="Time Off";

            let correctans= questions[que_count].answer;
            let alloptions=option_list.children.length;

            for (let i=0;i<alloptions;i++){
                if(option_list.children[i].textContent==correctans){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
    
                }
            }
            for(let i=0;i<alloptions;i++){
                option_list.children[i].classList.add("disabled");
            } 
            next_btn.style.display="block";
        }
    }
}

function startTimerline(time){
    counterline=setInterval(timer,29);
    function timer(){
        time +=1;
        timeline.style.width = time + "px";
        if(time > 549){
            clearInterval(counterline);

        }
    }
}
function quecounter(index){

const bottom_ques_counter=quiz_box.querySelector(".total_que");
let totalQuesCountTag = '<span><p>'+index+'</p>of<p>'+questions.length+'</p>Questions</span>';
bottom_ques_counter.innerHTML=totalQuesCountTag;
};