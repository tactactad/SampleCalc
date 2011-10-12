// SampleCalcコンストラクタ
function SampleCalc() {
    this.total = 0;
    this.stack = '0';
    this.operator = '';
    this.last = 'num'; // 'num': 数字, 'op': 演算子

    this.mTotal = 0;
}
// SampleClac Prototype拡張
SampleCalc.prototype = {
    // 数値入力を受け付ける。
    inputValue: function (value) {

    },
    // 演算子入力を受け付ける。
    inputOperator: function (newOperator) {

    },
    // イコールボタンが押された時に処理を行う。
    equal: function () {

    },
    // クリアボタンが押された時に処理を行う。
    clear: function () {

    },
    // 入力されたデータを元に計算を行う。
    calculate: function () {

    },
    // メモリー計算を行う。
    mCalculate: function (mOperator) {

    },
    // 入力された数値をスタック領域に保存する。
    push: function (value) {

    },
    // 画面に出力する。
    display: function (value) {

    }
};


// 読み込み時にイベントを貼付ける。
$(function () {
    var calc = new SampleCalc();
    $('.num').each(function () {
        $(this).click(function () {

        });
    });
    $('.op').each(function() {
        $(this).click(function () {

        });
    });
    $('#buttonClear').click(function () {

    });
    $('#buttonEqual').click(function () {

    });
    $('.mOp').each(function () {
        $(this).click(function () {

        });
    });
});
