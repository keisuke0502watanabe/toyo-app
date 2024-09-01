//問題と解答
qa = new Array();
aa = new Array();
qa[0] = ["胸やお腹が張って苦しいことが多い","はい","いいえ","多少",1];
aa[0] = [0,0,0,0,3,1,0,1];
qa[1] = ["イライラいしやすく怒りっぽい","はい","いいえ","多少",2];
aa[1] = [0,0,0,2,3,0,0,0];
qa[2] = ["不眠になりやすい","はい","いいえ","多少",3];
aa[2] = [0,0,3,2,3,0,1,0];
qa[3] = ["黄色い粘りのある痰や鼻水がよく出る","はい","いいえ","多少",1];
aa[3] = [0,0,0,0,0,3,0,0];
qa[4] = ["尿がよく濃い黄色になる","はい","いいえ","多少",2];
aa[4] = [0,0,0,1,0,3,0,0];
qa[5] = ["肩がこりやすい","はい","いいえ","多少",3];
aa[5] = [0,0,0,0,3,1,3,1];
qa[6] = ["唇や歯茎の色が紫に近い","はい","いいえ","多少",2];
aa[6] = [0,0,0,0,0,0,3,0];
qa[7] = ["頭が重く感じられることが多い","はい","いいえ","多少",1];
aa[7] = [1,0,0,0,0,1,1,3];
qa[8] = ["雨の日や湿度の高い日は体調が悪くなりがち","はい","いいえ","多少",3];
aa[8] = [0,0,0,0,0,1,0,3];
qa[9] = ["皮膚が乾燥してカサカサしている","はい","いいえ","多少",2];
aa[9] = [0,0,3,1,0,0,1,0];
qa[10] = ["舌の縁がギザギザになっている","はい","いいえ","多少",1];
aa[10] = [3,1,0,0,0,0,0,2];
qa[11] = ["舌苔がびっしりついていて厚みがある","はい","いいえ","多少",2];
aa[11] = [2,1,0,0,0,2,0,2];
qa[12] = ["舌の裏の静脈が太く膨らんで見える","はい","いいえ","多少",3];
aa[12] = [0,0,0,0,0,0,3,0];
qa[13] = ["食が細いほうだ","はい","いいえ","多少",1];
aa[13] = [3,0,0,0,0,0,0,0];
qa[14] = ["下痢や軟便になることがよくある","はい","いいえ","多少",2];
aa[14] = [3,1,0,0,0,1,0,2];
qa[15] = ["よく、腰やひざに疲れや脱力感を覚える","はい","いいえ","多少",3];
aa[15] = [0,3,0,0,0,0,0,0];
qa[16] = ["むくみを感じることが多い","はい","いいえ","多少",2];
aa[16] = [0,3,0,0,0,0,0,2];
qa[17] = ["髪の毛が抜けやすい","はい","いいえ","多少",1];
aa[17] = [0,2,3,0,0,1,1,0];
qa[18] = ["目が疲れたり、乾燥しやすい","はい","いいえ","多少",3];
aa[18] = [0,0,3,1,0,0,0,0];
qa[19] = ["筋肉がけいれんしたり、つりやすい","はい","いいえ","多少",2];
aa[19] = [0,0,3,1,1,0,0,0];
qa[20] = ["体温は高くないが、体が熱っぽく感じる","はい","いいえ","多少",3];
aa[20] = [0,0,0,3,2,1,0,0];
qa[21] = ["疲労時や夜に、よく手のひらや足の裏が暑くなる","はい","いいえ","多少",2];
aa[21] = [0,0,0,3,0,0,0,0];
sum = [0,0,0,0,0,0,0,0];
//初期設定
count = 0; //問題番号
q_sel = 3; //選択肢の数
//問題表示
function quiz() {
	//問題
	document.getElementById("text_q").innerHTML = (count + 1) + "問目：" + qa[count][0];
  //選択肢
	s = "";
	//for (n=1;n<=q_sel;n++) {
	//	s += "【<a href='javascript:answer(" + n + ")'>" + n + "：" + qa[count][n] + "</a>】";
	//}
	for (n=1;n<=q_sel;n++) {
	s = "<a href='javascript:answer(" + n + ")'>" + n + "：" + qa[count][n] + "</a>";

//
	document.getElementById("text_s"+ n ).innerHTML = s;
	s = "";
  }
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
  if (count < qa.length) {
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
