/*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*/

let warning = document.querySelector("#warning");

const submitBtn = document.querySelector(".submit-btn-form");
const createBtn = document.querySelector(".submit-btn-create");
const createInput = document.querySelector(".col.form");
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

createBtn.addEventListener("click", (e) => {
  e.preventDefault;
  let createDIV = document.createElement("div");
  createDIV.classList.add("students-info-form");

  let createH5_ID = document.createElement("h5");
  createH5_ID.innerText = "學號：";

  let createINPUT_ID = document.createElement("input");
  createINPUT_ID.setAttribute("placeholder", "請輸入學號");

  let createH5_Score = document.createElement("h5");
  createH5_Score.innerText = "分數：";

  let createINPUT_Score = document.createElement("input");
  createINPUT_Score.setAttribute("placeholder", "請輸入分數");

  createDIV.appendChild(createH5_ID);
  createDIV.appendChild(createINPUT_ID);
  createDIV.appendChild(createH5_Score);
  createDIV.appendChild(createINPUT_Score);
  createInput.appendChild(createDIV);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault;

  let studentsInfo = document.querySelectorAll(".students-info-form");

  //防止輸入空值
  studentsInfo.forEach((item) => {
    console.log(item);
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
      studentsScoreArray.push(Number(studentsScore));
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
        average += Number(item);
      });

      let result = document.createElement("li");
      average = Math.round(average / studentsScoreArray.length);
      theAverageResult.innerHTML = `總平均分數為： ${average} 分。`;

      //計算最高分並寫於 HTML 段落中
      let theHighest = findTheHighest(studentsScoreArray, studentsIDArray);
      theHighestResult.innerHTML = theHighest;

      //計算最低分並寫於 HTML 段落中
      let theLowest = findTheLowest(studentsScoreArray, studentsIDArray);
      theLowestResult.innerHTML = theLowest;

      //計算不及格百分比並寫於 HTML 段落中
      let unpass = findPercentage(studentsList);
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

function findPercentage(list) {
  let passed = 0;
  let unpassed = 0;
  let counter = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i].scores > 59) {
      passed += 1;
    } else {
      unpassed += 1;
    }
  }
  let unpassedPercentage = unpassed / (passed + unpassed);
  // 如果不及格率大於5成，則進行加分

  if (unpassedPercentage > 0.5) {
    addScores(list);
  }
  let newStudentID = document.querySelectorAll(".newStudentID");
  let newScore = document.querySelectorAll(".newScore");
  for (let i = 0; i < list.length; i++) {
    newStudentID[i].innerHTML = `學號 : ${list[i].IdNos}`;
    newScore[i].innerHTML = `分數 : ${list[i].scores}`;
  }
  return `原始不及格率為${Math.round(unpassedPercentage * 100)}%`;
}

// 加分功能（每人+1分，但不超過100分）
function addScores(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].scores < 100) {
      list[i].scores += 1;
    }
  }
  //因為加分改變原始的陣列分數，所以重新呼叫計算不及格百分比功能以驗證新陣列的不及格率
  findPercentage(list);
}
