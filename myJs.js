/*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*/

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

  // 取得輸入值並放入陣列之中
  studentsInfo.forEach((item) => {
    let studentsID = item.children[1].value;
    let studentsScore = item.children[3].value;
    studentsIDArray.push(studentsID);
    studentsScoreArray.push(studentsScore);
  });

  check(studentsIDArray, studentsScoreArray);
  function check(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      // 防止輸入空值
      if (arr1[i] == "" && arr2[i] == "") {
        continue;
      } else {
        // 將學生資料放入物件之中
        let studentsList = [
          (student1 = {
            IdNo: studentsIDArray[0],
            score: studentsScoreArray[0],
          }),
          (student2 = {
            IdNo: studentsIDArray[1],
            score: studentsScoreArray[1],
          }),
          (student3 = {
            IdNo: studentsIDArray[2],
            score: studentsScoreArray[2],
          }),
          (student4 = {
            IdNo: studentsIDArray[3],
            score: studentsScoreArray[3],
          }),
          (student5 = {
            IdNo: studentsIDArray[4],
            score: studentsScoreArray[4],
          }),
        ];

        let student = document.querySelectorAll(".student");
        let score = document.querySelectorAll(".score");

        for (let i = 0; i < 5; i++) {
          student[i].innerText = `學號 : ${studentsList[i].IdNo}`;
          score[i].innerText = `分數 : ${studentsList[i].score}`;
        }

        //計算平均分數 //將平均值的結果，寫於 HTML 段落中
        let average = 0;
        studentsScoreArray.forEach((item, index) => {
          average += Number(item);
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
        let unpass = findPercentage(studentsScoreArray, studentsList);
        unpassResult.innerHTML = unpass;

        //顯現結果段落
        resultSection1.style.display = "block";
        resultSection2.style.display = "block";
        resultSection3.style.display = "block";

        //清除已輸入資料
        studentsInfo.forEach((item) => {
          item.children[1].value = "";
          item.children[3].value = "";
          studentsIDArray.pop(item.children[1].value);
          studentsScoreArray.pop(item.children[1].value);
        });

        break;
      }
    }
  }
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

function findPercentage(scores, newScoresList) {
  let counter = 0;
  let total = scores.length;
  for (let i = 0; i <= scores.length; i++) {
    if (scores[i] > 60) {
      counter += 1;
    }
  }

  counter = ((counter / total) * 10000) / 100;

  if (counter < 50) {
    for (let i = 0; i < newScoresList.length; i++) {
      if (newScoresList[i].score < 60) {
        let newScores = Number(newScoresList[i].score);
        for (let j = 1; j + newScores <= 60; j = 1) {
          newScores += j;
        }
        newScoresList[i].score = newScores;
      }
    }
    let newStudentID = document.querySelectorAll(".newStudentID");
    let newScore = document.querySelectorAll(".newScore");
    for (let i = 0; i < 5; i++) {
      console.log(newScoresList);
      newStudentID[i].innerHTML = `學號 : ${newScoresList[i].IdNo}`;
      newScore[i].innerHTML = `分數 : ${newScoresList[i].score}`;
    }
  }

  return `及格率為${counter}%`;
}
