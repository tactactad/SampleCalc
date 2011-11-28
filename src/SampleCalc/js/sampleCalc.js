function SampleCalc() {
    this.total = 0;
    this.stack = '0';
    this.operator = '';
    this.last = 'num'; // 'num': 数字, 'op': 演算子

    this.mTotal = 0;
}
SampleCalc.prototype = {
    releaseAllOpButtons: function () {
        $('.op').each(function () {
            $(this).removeClass('opHold');
        });
    },
    holdOpButton: function (holdOp) {
        this.releaseAllOpButtons();
        $('div[data-value="' + holdOp + '"]').addClass('opHold');
    },
    inputValue: function (value) {
        console.log('inputValueに渡された値は ' + value + ' です。');
        value = String(value);
        if (!value.match(/^([0-9]{1}|dec)$/)) {
            return;
        }
        this.releaseAllOpButtons();

        if (this.stack === '0' || this.last !== 'num') {
            this.stack = '';
        }
        if (value === 'dec') {
            if (this.stack.match(/\./)) { // 既に小数の場合は無視する。
                return;
            }
            value = (this.stack === '') ? '0.' : '.';
        }
        this.stack += value;
        this.last = 'num';
        this.push(this.stack);
    },
    inputOperator: function (newOperator) {
        console.log('inputOperatorに渡された値は ' + newOperator + ' です。');
        newOperator = String(newOperator);
        if (!newOperator.match(/^(add|sub|mult|div)$/)) {
            return;
        }
        this.holdOpButton(newOperator);

        if (this.last !== 'num') {
            this.operator = '';
        }
        this.calculate();
        this.operator = newOperator;
        this.last = 'op';
        this.push(this.total);
    },
    equal: function () {
        console.log('=ボタンが押されました。');
        this.releaseAllOpButtons();
        this.calculate();
        this.operator = '';
        this.last = 'eq';
        this.push(this.total);
    },
    clear: function () {
        console.log('Cボタンが押されました。');
        this.releaseAllOpButtons();
        this.total = 0;
        this.operator = '';
        this.last = 'num';
        this.push(0);
    },
    calculate: function () {
        var stack = Number(this.stack);
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
    mCalculate: function (mOperator) {
        mOperator = String(mOperator);
        if (!mOperator.match(/^(mAdd|mSub|mResult|mClear)$/)) {
            return;
        }
        var exp = Number(this.stack);
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
    push: function (value) {
        console.log('push への value の値は' + value + 'です。');
        this.stack = String(value);
        this.display(this.stack);
    },
    display: function (value) {
        $('#screen span').fadeOut(100, function () {
            $(this).text(String(value));
            $(this).show();
        });
    }
};

$(function () {
    var calc = new SampleCalc();
    $('.num').click(function () {
        var value = $(this).data('value');
        calc.inputValue(value);
    });
    $('.op').click(function() {
        var value = $(this).data('value');
        calc.inputOperator(value);
    });
    $('#buttonClear').click(function () {
        calc.clear();
    });
    $('#buttonEqual').click(function () {
        calc.equal();
    });
    $('.mOp').click(function () {
        var value = $(this).data('value');
        calc.mCalculate(value);
    });
});
