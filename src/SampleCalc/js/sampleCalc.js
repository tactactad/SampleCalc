function SampleCalc() {
    this.total = 0;
    this.stack = '0';
    this.operator = '';
    this.last = 'num'; // 'num': 数字, 'op': 演算子

    this.mTotal = 0;
}
SampleCalc.prototype = {
    inputValue: function (value) {

    },
    inputOperator: function (newOperator) {

    },
    equal: function () {

    },
    clear: function () {

    },
    calculate: function () {

    },
    mCalculate: function (mOperator) {

    },
    push: function (value) {

    },
    display: function (value) {

    }
};

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
