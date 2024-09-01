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
var numQ = 22; //問題数 22問

//問題と選択肢の読み込み
getCSV("./data/question.csv", qa);
//ポイント表読み込み
getCSV("./data/point.csv", aa);
//ポイント数値化
stringToNum(aa, 1, 23, 0, 8);
//体質の特徴表読み込み
getCSV("./data/8type.csv", bb);
//体質別よい悪い食材表
getCSV("shokuzai.csv", cc);
//食材表数値化
stringToNum(cc, 1, 50, 4, 12);

//問題表示
//quiz();

//数値変換
function stringToNum(xx, i_min, i_max, j_min, j_max){
  for (i=i_min; i<i_max; i++){
    for ( j=j_min; j<j_max; j++){
      xx[i][j] = Number(xx[i][j]);
    }
  }
}

//csvファイル読み込み、２次元配列生成
function getCSV(filename, result){
  var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", filename, false); // アクセスするファイルを指定
    req.send(); // HTTPリクエストの発行
    var tmp = req.responseText.split("\n");
        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            result[i] = tmp[i].split(',');
        }
}

document.getElementById("question").style.display="none";
for (n=1;n<=3;n++){
document.getElementById("btn"+n).style.visibility="hidden";
}
//診断開始
function start() {
  document.getElementById("question").style.display="block";
  document.getElementById("diagstart").style.visibility="hidden";
  for (n=1;n<=3;n++){
  document.getElementById("btn"+n).style.visibility="visible";
}
  quiz();
}

//問題表示
function quiz() {
	//問題
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

　//体質タイプ別ポイント加算
  for (n=0;n<=6;n++) {
		s+= aa[count][n]+", ";
	}
    //最後カンマなしで加算
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
  if (count < numQ+1) {
      quiz();
	} else {
      end(sum, diag);
  }
}

function end(sum, diag){
  var sum0 = 0;
  //終了
  document.getElementById("text_q").innerHTML = "終了です";

  //type割り出し, 体質ポイントsum[i]の中で、最大値を持つ番号をtypeに代入[0~7]
  type=sum.indexOf(Math.max.apply(null, sum));
  //alert('type'+type);

  //factor算出、1:体質ポイントの合計、2:%を計算
  for (i=0,len=sum.length; i<len; ++i) {
      sum0 += sum[i];
  }
  for (i=0,len=sum.length; i<len; ++i) {
      factor[i] = Math.round(sum[i]/sum0*100);
  }

  ranking = rank(sum);

  //食材ポイント
  //for(i=1;i<144;i++){
  //  cc[]
  //}
  //var a=0;
  //if(ranking[0]==1) {
  //  diagtype[0] += diag[0] +"型" + factor[0] + "%  ";
  //} //else if (ranking[0]>1) {diagtype[0]="";}

  c = 0;
  d = 0;
  e = 0;
  for ( i=0, len=sum.length; i<len;i++){
  //var diagtype = [];
    if(ranking[i]==1) {
        if(c==0) {
          diagtype[0] = diag[i] +"型　" + factor[i] + "%  ";
          c+=1;
        } else if (c>0){
          diagtype[0] += "<br>" + diag[i] +"型　" + factor[i] + "%  ";
          c+=1;
        }
    } else if(ranking[i]==2) {
        if(d==0) {
          diagtype[1] = "<br>"+diag[i] +"型　" + factor[i] + "%  ";
          d+=1;
        } else if (d>0) {
          diagtype[1] += ", "+diag[i] +"型　" + factor[i] + "%  ";
          d+=1;
        }
    } else if(ranking[i]==3) {
        if(e==0) {
          diagtype[2] = "<br>"+diag[i] +"型　" + factor[i] + "%  ";
          e+=1;
        } else if (e>0) {
          diagtype[2] += ", "+diag[i] +"型　" + factor[i] + "%  ";
          d+=1;
        }
      }
  }
    //alert(diagtype);
    document.getElementById("text_diag1").innerHTML = "あなたの体質は、<br>"+diagtype+"<br>です。";
    document.getElementById("text_diag3").innerHTML = "最も強い型について、<br>"+bb[type+2][0]+"<br><br>"+bb[type+2][1]+"<br><br>"+bb[type+2][2];
}

//体質順位付け
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
