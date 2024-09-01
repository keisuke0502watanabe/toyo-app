var result = []; // 最終的な二次元配列を入れるための配列
var qa = []; //問題文と選択肢
var aa = []; //タイプ別ポイント表
var bb = []; //タイプ別コメント
var cc = []; //タイプ別食材表
var factor =[]; //タイプのファクター
var diagtype = [];
var typeArr = [];

//初期設定
count = 1; //問題番号
q_sel = 3; //選択肢の数
sum =[0,0,0,0,0,0,0,0];

//問題とポイント
getCSV("question.csv", qa);
getCSV("point.csv", aa);
stringToNum(aa, 1, 23, 0, 8);
getCSV("8type.csv", bb);
getCSV("shokuzai.csv", cc);
//alert(cc);
stringToNum(cc, 1, 50, 4, 12);
//alert(cc);

//問題表示
quiz();

//数値変換
function stringToNum(xx, i_min, i_max, j_min, j_max){
  for (i=i_min; i<i_max; i++){
    for ( j=j_min; j<j_max; j++){
      xx[i][j] = Number(xx[i][j]);
    }
  }
}

function getCSV(filename, result){
  var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", filename, false); // アクセスするファイルを指定
    req.send(); // HTTPリクエストの発行
    var tmp = req.responseText.split("\n");
    	//	alert(tmp[1]);
        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            result[i] = tmp[i].split(',');
        }
        //alert(result[1]);
}



function quiz() {
  //alert(qa[1][0]);
	//問題
	//alert(qa[0][0]);
	document.getElementById("text_q").innerHTML = (count) + "問目：" + qa[count][0];
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
	diag =["A: 脾虚 ", "B: 腎陽虚 ", "C: 血虚 ", "D: 陰虚 ", "E: 気滞 ", "F: 湿熱 ", "G: 血瘀 ", "H: 湿痰 "]
	s = (count) + "問目：";
  //

  for (n=0;n<=6;n++) {
		s+= aa[count][n]+", ";
	}
	  s+= aa[count][7];
	//答えによって
	if (num == 1) {
		//はいの場合
		for (n=0;n<=7;n++) {
		sum[n] += aa[count][n];
		}
	// else {
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

  //type割り出し
  type=sum.indexOf(Math.max.apply(null, sum));
	//diag=diag[type];

  var sum0 = 0;
    for (i=0,len=sum.length; i<len; ++i) {
        sum0 += sum[i];
    };
    for (i=0,len=sum.length; i<len; ++i) {
      factor[i] = Math.round(sum[i]/sum0*100);
    }

    //alert(sum0);

    ranking = rank(sum);



  //食材ポイント
  //for(i=1;i<50;i++){
  //  cc[]
  //}
  //var a=0;
  //if(ranking[0]==1) {
  //  diagtype[0] += diag[0] +"型" + factor[0] + "%  ";
  //} //else if (ranking[0]>1) {diagtype[0]="";}
c = 0;
  for ( i=0, len=sum.length; i<len;i++){

//    d = 0;
//    e = 0;
    if(ranking[i]==1) {
      if(c==0) {
        //diagtype[0] = "";
        //alert(diagtype[0]);
        diagtype[0] += diag[i] +"型　" + factor[i] + "%  ";
        //alert(diagtype[0]);
        c+=1;
      } else if (c>1){
        diagtype[0] += "<br>" + diag[i] +"型　" + factor[i] + "%  ";
        //alert(diagtype[0]);
        c+=1;
      }

    } else if(ranking[i]==2) {
      //alert(diagtype[1]);
      diagtype[1] += "<br>"+diag[i] +"型　" + factor[i] + "%  ";
      //alert(diagtype[1]);
      c+=1;
    } else if(ranking[i]==3) {
      diagtype[2] += "<br>"+diag[i] +"型　" + factor[i] + "%  ";

    }
  }
    document.getElementById("text_diag1").innerHTML = "あなたの体質は、<br>"+diagtype+"です。";


	//document.getElementById("text_diag2").innerHTML = sum+"<br>"+ranking+"<br>"+sum0+"<br>"+factor;
  document.getElementById("text_diag3").innerHTML = bb[type+2][0]+"<br><br>"+bb[type+2][1]+"<br><br>"+bb[type+2][2];

	}
}

function rank(a){
	var i,j,tmp;
	var ranking = new Array();
	if(a.length == 0){
		return a;
	}
	for(i in a){
		ranking[i] = 1;
	}
	for(i = 0; i < a.length - 1; i++){
		for(j = i + 1; j < a.length; j++){
			if(a[i] < a[j]) ranking[i]++;
			if(a[i] > a[j]) ranking[j]++;
		}
	}
	return ranking;
}
