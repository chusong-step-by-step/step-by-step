const fs = require("fs");

// 오늘 날짜 구하기
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

// 파일명 : 오늘 날짜 형식 만들기
const dateFormatting = (year, month, date) => {
  return `${year}-${month.toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}`;
};

const dateFormat = dateFormatting(year, month, date);

// 폴더명 : 몇 주차인지 구하기
const getWeekNumber = (date) => {
  const startOfMonth = new Date(new Date().setDate(1));
  const weekDay = startOfMonth.getDay();
  return parseInt((weekDay - 1 + date) / 7) + 1;
};

const week = getWeekNumber(date);
const weeks = ["첫째주", "둘째주", "셋째주", "넷째주", "다섯째주"];

const dirName = `${year}-${month.toString().padStart(2, "0")}-${
  weeks[week - 1]
}`;

// 디렉토리 만들기
const makeDir = (dirName) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, (err) => {
      if (err) {
        console.log("디렉토리 생성 중 오류가 발생!!");
      } else {
        console.log("디렉토리 추가 완료!");
      }
    });
  }
};

// 파일 만들기
const makeFile = (dirName, dateFormat) => {
  if (!fs.readFileSync(`${dirName}/${dateFormat}.md`)) {
    fs.writeFile(
      `${dirName}/${dateFormat}.md`,
      `# ${dateFormat}의 TIL`,
      (err) => {
        if (err) {
          console.log("에러 발생!:", err);
        } else {
          console.log("파일이 성공적으로 추가되었습니다.");
        }
      }
    );
  }
};

makeDir(dirName);
makeFile(dirName, dateFormat);
