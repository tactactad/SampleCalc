/**
 *
 * ブラウザで電卓アプリゆとり風
 *
 * @module sampleCalc
 *
 */
/**
 * SampleCalcオブジェクトを生成
 *
 * @class SampleCalc
 * @constructor
 * @namespace SampleCalc
 */
function SampleCalc() {
    /**
     * 計用
     * @property total
     * @type Number
     */
    this.total = 0;
    /**
     * 数値用
     * @property stack
     * @type String
     */
    this.stack = '0';
    /**
     * 演算子用
     * @property operator
     * @type String
     */
    this.operator = '';
    /**
     * 最後に入力した値
     * @property last
     * @type String
     */
    this.last = 'num'; // 'num': 数字, 'op': 演算子

    /**
     * メモリー計
     * @property mTotal
     * @type Number
     */
    this.mTotal = 0;
}
SampleCalc.prototype = {
    /**
     * 数値の入力を受け付ける。
     *
     * @method inputValue
     * @param {Number} value 入力値
     */
    inputValue: function (value) {
        value = String(value);
        if (!value.match(/^[0-9]{1}$/)) {
            return;
        }
        if (this.stack === '0' || this.last !== 'num' ) {
            this.stack = '';
        }
        this.stack += value;
        this.last = 'num';
        this.push(this.stack);
    },
    /**
     * 演算子の入力を受け付ける。
     *
     * @method inputOperator
     * @param {Stirng} newOperator 演算子
     */
    inputOperator: function (newOperator) {
        newOperator = String(newOperator);
        if (!newOperator.match(/^(add|sub|mult|div)$/)) {
            return;
        }
        if (this.last !== 'num') {
            this.operator = '';
        }
        this.calculate();
        this.operator = newOperator;
        this.last = 'op';
        this.push(this.total);
    },
    /**
     * = ボタンが押された時。
     *
     * @method equal
     */
    equal: function () {
        this.calculate();
        this.operator = '';
        this.last = 'eq';
        this.push(this.total);
    },
    /**
     * c ボタンが押された時。
     *
     * @method clear
     */
    clear: function () {
        this.total = 0;
        this.operator = '';
        this.last = 'num';
        this.push(0);
    },
    /**
     * 四則演算を行う。
     *
     * @method calculate
     */
    calculate: function () {
        var stack = parseInt(this.stack, 10);
        switch (this.operator) {
        case 'add':
            this.total = this.total + stack;
            break;
        case 'sub':
            this.total = this.total - stack;
            break;
        case 'mult':
            this.total = this.total * stack;
            break;
        case 'div':
            if (this.total === 0 || stack === 0) {
                this.total = 0;
            } else {
                this.total = this.total / stack;
            }
            break;
        default:
            this.total = stack;
            break;
        }
    },
    /**
     * メモリー演算を行う。
     *
     * @method mCalculate
     * @param {String} mOperator メモリー演算子
     */
    mCalculate: function (mOperator) {
        mOperator = String(mOperator);
        if (!mOperator.match(/^(mAdd|mSub|mResult|mClear)$/)) {
            return;
        }
        var exp = parseInt(this.stack, 10);
        switch (mOperator) {
        case 'mAdd':
            this.mTotal = this.mTotal + exp;
            break;
        case 'mSub':
            this.mTotal = this.mTotal - exp;
            break;
        case 'mResult':
            this.push(this.mTotal);
            break;
        case 'mClear':
            this.mTotal = 0;
            break;
        default:
            break;
        }
        this.last = 'op';
        if (mOperator !== 'mResult') {
            this.display(exp);
        }
    },
    /**
     * 入力値をスタックに保持する。
     *
     * @method push
     * @param {String} value 入力された値
     */
    push: function (value) {
        this.stack = String(value);
        this.display(this.stack);
    },
    /**
     * 画面に出力する。
     *
     * @method display
     * @param {Number} value 出力する値。
     */
    display: function (value) {
        $('#screen span').fadeOut('fast', function () {
            $('#screen span').text(String(parseInt(value, 10)));
            $('#screen span').fadeIn('fast');
        });// 小数点を無視するので丸めてる
    }
};

/**
 * ボタン要素にイベントを貼付ける。
 */
$(function () {
    var calc = new SampleCalc();
    $('.num').each(function () {
        var value = $(this).data('value');
        $(this).click(function () {
            calc.inputValue(value);
        });
    });
    $('.op').each(function() {
        var operator = $(this).data('value');
        $(this).click(function () {
            calc.inputOperator(operator);
        });
    });
    $('#buttonClear').click(function () {
        calc.clear();
    });
    $('#buttonEqual').click(function () {
        calc.equal();
    });
    $('.mOp').each(function () {
        var operator = $(this).data('value');
        $(this).click(function () {
            calc.mCalculate(operator);
        });
    });
});
