/*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*/

let warning = document.querySelector("#warning");

const submitBtn = document.querySelector(".submit-btn-form");
const studentsInfo = document.querySelectorAll(".students-info-form");
const resultSection1 = document.querySelector(".result-section1");
const resultSection2 = document.querySelector(".result-section2");
const resultSection3 = document.querySelector(".result-section3");

let theHighestResult = document.querySelector("#Highest-Result");
let theLowestResult = document.querySelector("#Lowest-Result");
let theAverageResult = document.querySelector("#Average-Result");
let unpassResult = document.querySelector("#unpass-Result");

let newAverageResult = document.querySelector("#New-Average-Result");

const studentsIDArray = [];
const studentsScoreArray = [];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault;

  //防止輸入空值
  studentsInfo.forEach((item) => {
    let studentsID = item.children[1].value;
    let studentsScore = item.children[3].value;

    if (studentsID == "" && studentsScore == "") {
      return;
    } else if (studentsID == "") {
      warning.innerText = "請先至少完整輸入一個人的學號及分數！";
      return;
    } else if (studentsScore == "") {
      warning.innerText = "請先至少完整輸入一個人的學號及分數！";
      return;
    } else {
      warning.innerText = "";
      studentsIDArray.push(studentsID);
      studentsScoreArray.push(studentsScore);
    }
    // 將學生資料放入物件之中
    check(studentsIDArray, studentsScoreArray);
    function check(arr1, arr2) {
      let studentsList = [];

      for (let i = 0; i < arr1.length; i++) {
        let obj = {};
        obj.IdNos = arr1[i];
        obj.scores = arr2[i];
        studentsList.push(obj);
      }

      //將學生清單（物件）寫於 HTML 段落中
      let student = document.querySelectorAll(".student");
      let score = document.querySelectorAll(".score");

      studentsList.forEach((item, index) => {
        student[index].innerText = `學號 : ${studentsList[index].IdNos}`;
        score[index].innerText = `分數 : ${studentsList[index].scores}`;
      });

      //計算平均分數 //將平均值的結果，寫於 HTML 段落中
      let average = 0;
      studentsScoreArray.forEach((item, index) => {
        average += Math.round(Number(item));
      });

      let result = document.createElement("li");
      average = average / studentsScoreArray.length;
      theAverageResult.innerHTML = `總平均分數為： ${average} 分。`;

      //計算最高分並寫於 HTML 段落中
      let theHighest = findTheHighest(studentsScoreArray, studentsIDArray);
      theHighestResult.innerHTML = theHighest;

      //計算最低分並寫於 HTML 段落中
      let theLowest = findTheLowest(studentsScoreArray, studentsIDArray);
      theLowestResult.innerHTML = theLowest;

      //計算不及格百分比並寫於 HTML 段落中
      let unpass = findPercentage(studentsScoreArray);
      let correctionScores = correction(studentsList);
      unpassResult.innerHTML = unpass;

      //顯現結果段落
      resultSection1.style.display = "block";
      resultSection2.style.display = "block";
      resultSection3.style.display = "block";
    }
  });

  //清除已輸入資料
  studentsInfo.forEach((item) => {
    item.children[1].value = "";
    item.children[3].value = "";
    studentsIDArray.splice(0, studentsIDArray.length);
    studentsScoreArray.splice(0, studentsScoreArray.length);
  });
});

//計算最高分

function findTheHighest(scores, IDs) {
  let theHighestID = IDs[0];
  let theHighestScore = scores[0];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > theHighestScore) {
      theHighestScore = scores[i];
      theHighestID = IDs[i];
    }
  }
  return `學號${theHighestID}的學生考了最高分，分數為${theHighestScore}分。`;
}

//計算最低分;

function findTheLowest(scores, IDs) {
  let theLowestScore = scores[0];
  let theLowestID = IDs[0];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] < theLowestScore) {
      theLowestScore = scores[i];
      theLowestID = IDs[i];
    }
  }
  return `學號${theLowestID}的學生考了最低分，分數為${theLowestScore}分。`;
}

//計算不及格百分比;

function findPercentage(scores) {
  let counter = 0;
  for (let i = 0; i <= scores.length; i++) {
    if (scores[i] > 60) {
      counter += 1;
    }
  }

  counter = Math.round(((counter / scores.length) * 10000) / 100);
  return `及格率為${counter}%`;
}

//及格率低於50%，將補正後的分數寫於 HTML 段落中。

function correction(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].scores < 60) {
      let newScores = Number(list[i].scores);
      for (let j = 1; j + newScores <= 60; j = 1) {
        newScores += j;
      }
      list[i].scores = newScores;
    }
  }
  //   將補正後的分數寫於 HTML 段落中

  let newStudentID = document.querySelectorAll(".newStudentID");
  let newScore = document.querySelectorAll(".newScore");
  for (let i = 0; i < list.length; i++) {
    newStudentID[i].innerHTML = `學號 : ${list[i].IdNos}`;
    newScore[i].innerHTML = `分數 : ${list[i].scores}`;
  }
}
