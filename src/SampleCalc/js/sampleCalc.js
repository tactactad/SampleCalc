function SampleCalc() {
    this.total = 0;
    this.stack = '0';
    this.operator = '';
    this.last = 'num'; // 'num': 数字, 'op': 演算子

    this.mTotal = 0;
}
SampleCalc.prototype = {
    inputValue: function (value) {
        console.log('inputValueに渡された値は ' + value + ' です。');
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
    inputOperator: function (newOperator) {
        console.log('inputOperatorに渡された値は ' + newOperator + ' です。');
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
    equal: function () {
        console.log('=ボタンが押されました。');
        this.calculate();
        this.operator = '';
        this.last = 'eq';
        this.push(this.total);
    },
    clear: function () {
        console.log('Cボタンが押されました。');
        this.total = 0;
        this.operator = '';
        this.last = 'num';
        this.push(0);
    },
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
    push: function (value) {
        this.stack = String(value);
        this.display(this.stack);
    },
    display: function (value) {
        $('#screen span').fadeOut(100, function () {
            $(this).text(String(parseInt(value, 10)));
            $(this).show()
        });// 小数点を無視するので丸めてる
//       $('#screen span').text(String(parseInt(value, 10)));// 小数点を無視するので丸めてる
    }
};

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