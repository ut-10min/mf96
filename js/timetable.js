function construstTimeTable(timeTable, talksData) {
  return Object.keys(timeTable)
    .filter(function (k) {return timeTable[k];})
    .sort()
    .map(function (time) {
      // console.log(time);
      var name = timeTable[time];
      // console.log(name);
      var index = 0;

      var talk = talksData.filter(function (t) { return t.name.indexOf(name) == 0; })[index];
      // 何部目か判定
      if (
        (name == "第1部") ||
        (name == "第2部") ||
        (name == "第3部") ||
        (name == "第4部") 
      ) 
      {
        return { time: name, name: "", title: "", major: ""};
      } 
      else if (name == "改行") {
        return { time: "\xa0", name: "\xa0", title: "", major: ""};
      }
      else if (
        (name == "研究テーマってどうやって決める？") ||
        (name == "私の大学院生としての生活、研究以外何してる？") ||
        (name == "当たり前だったと思っていたが、他分野の人と接することでそうではないと気付いたこと") ||
        (name == "東大の大学院生の生活スタイル") ||
        (name == "コロナ禍で研究のやり方はどう変わった？") ||
        (name == "「勉強」と「研究」の割合(体感)について。研究テーマの決め方。") ||
        (name == "大学ではやたらハエの研究が多いが、虫が苦手だったり、研究室志望が思うようにならなかった等の人たちの行く末は？") ||
        (name == "大学院出た後どうしたい？") ||
        (name == "自分のラボの研究はチームプレー？ 個人プレー？ 他のラボメンバーとの関わり") 

      ) {
        return { time: time, name: "進行：" + talk.chairperson, 
          title: talk.title + "：<br />" + talk.name, 
          major: "" };
      }
      //else if (name == "第1部講演の録画を放映予定") {
      //  return { time: time, name: "", title: name, major: ""};
      //}
      else {
        return { time: time, name: talk.name, title: talk.title, major: talk.affiliation };
      }
    });
}


$(function () {
  var firstDayTable  = construstTimeTable(day1, data);
  var secondDayTable = construstTimeTable(day2, data);
  // var thirdDayTable  = construstTimeTable(day3, data);

  var template = $('#template').html();
  Mustache.parse(template);
  var renderedFirst  = Mustache.render(template, {table: firstDayTable,  header: "5/13 (土)"});
  var renderedSecond = Mustache.render(template, {table: secondDayTable, header: "5/14 (日)"});
  // var renderedThird  = Mustache.render(template, {table: thirdDayTable,  header: "11/20 (日)"});
  // $('.article-headline').html(renderedFirst + "<br />" + renderedSecond + "<br />" + renderedThird);
  $('.article-headline').html(renderedFirst + "<br />" + renderedSecond);
});