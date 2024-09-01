//問題と解答
var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
var result = []; // 最終的な二次元配列を入れるための配列
var qa = [];
var aa = [];
var abc = [];

//初期設定
count = 0; //問題番号
q_sel = 3; //選択肢の数
//問題表示
loadQuestion();


function loadQuestion(){

	getCSV("question.csv");


	getCSV2("point.csv");
	req.onload = function(){
		str=req.responseText
		//alert(str);
		var aa = convertCSVtoArray2(str); // 渡されるのは読み込んだCSVデータ
	}

	sum = [0,0,0,0,0,0,0,0];

}

function getCSV(filename){
		//var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
		//alert(filename);
		req.open("get", filename, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
		
	  // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
		req.onload = function(){
			str=req.responseText
			//alert(str);
			convertCSVtoArray(str); // 渡されるのは読み込んだCSVデータ

		}
		alert(result);

		quiz();

}

function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
		//var result = []; // 最終的な二次元配列を入れるための配列
		var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

		// 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
		for(var i=0;i<tmp.length;++i){
				result[i] = tmp[i].split(',');
		}
		for(var i=1;i<tmp.length;++i){
				qa[i-1]=result[i];
		}

}

function getCSV2(filename){
		//var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
		//alert(filename);
		req.open("get", filename, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
}

function convertCSVtoArray2(str){ // 読み込んだCSVデータが文字列として渡される
		//var result = []; // 最終的な二次元配列を入れるための配列
		var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

		// 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
		for(var i=0;i<tmp.length;++i){
				result[i] = tmp[i].split(',');
		}
		for(var i=1;i<tmp.length;++i){
				aa[i-1]=result[i];
		}
}

function quiz() {

	result2.innerHTML=aa;

	//問題
	//alert(qa[0][0]);
	document.getElementById("text_q").innerHTML = (count + 1) + "問目：" + qa[count][n];
  //選択肢
	s = "";
	for (n=1;n<=q_sel;n++) {
		s = "<a href='javascript:answer(" + n + ")'>" + n + "：" + qa[count][n] + "</a>";
		//
		document.getElementById("text_s"+ n ).innerHTML = s;
		s = "";
  }
}

function OnButtonClick() {
					 target = document.getElementById("output");
					 target.innerHTML = "Penguin";
			 }

//解答表示
function answer(num) {

	var s;
	var diag;
	diag =["A:脾虚", "B:腎陽虚", "C:血虚", "D:陰虚", "E:気滞", "F:湿熱", "G:血瘀", "H:湿痰"]
	s = (count + 1) + "問目：";
  //

  for (n=0;n<=6;n++) {
		s+= aa[count][n]+", ";
	}
	  s+= aa[count][7];
	//答え合わせ
	if (num == 1) {
		//正解
		for (n=0;n<=7;n++) {

		sum[n] += aa[count][n];
		}
	//} else {
	//	s += "×" + aa[count][1];
	}
	document.getElementById("text_a").innerHTML = s;
	document.getElementById("text_sum").innerHTML = sum;
  //次の問題を表示
	count++;
  if (count < 22) {
	quiz();
	} else {
  //終了
  document.getElementById("text_q").innerHTML = "終了です";
  document.getElementById("text_s1").innerHTML = "";//sum.indexOf(Math.max.apply(null,sum);
	document.getElementById("text_s2").innerHTML = "";//sum.indexOf(Math.max.apply(null,sum);
	document.getElementById("text_s3").innerHTML = "";//sum.indexOf(Math.max.apply(null,sum);
	document.getElementById("text_a").innerHTML = "";//sum.indexOf(Math.max.apply(null,sum);
	document.getElementById("text_sum").innerHTML = "";//sum.indexOf(Math.max.apply(null,sum);


	//document.getElementById("text_sum").innerHTML = sum.indexOf(5);
  type=sum.indexOf(Math.max.apply(null, sum));
	diag=diag[type];
	document.getElementById("text_diag1").innerHTML = "あなたの体質は、"+diag+"型です。";
	document.getElementById("text_diag2").innerHTML = sum;

//	document.getElementById("text_diag").innerHTML += "\n";
//	document.getElementById("text_diag").innerHTML += diag;
	//document.getElementById("text_diag").innerHTML = sum.indexOf(Math.max.apply(null, sum));
	//alert( sum.indexOf(Math.max.apply(null,sum) ); //=> 4
	//document.getElementById("text_sum").innerHTML = "";
	}
}
