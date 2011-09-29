var SampleCalc = function() {
    this.total = 0;
    this.stack = '0';
    this.operator = '';
    this.last = 'num'; // 'num': 数字, 'op': 演算子, 'eq': イコール

    this.mTotal = 0;

    this.push = function(value) {
        this.stack = String(value);
        this.display(this.stack);
    };

    this.inputValue = function(value) {
        console.log('input ' + value);
        value = String(value);
        if (!value.match(/^[0-9]{1}$/)) {
            console.log('invalid value...');
            return;
        }
        if (this.last === 'eq') {
            this.operator = '';
        }
        if (this.stack === '0' || this.last !== 'num' ) {
            this.stack = '';
        }
        this.stack += value;
        this.last = 'num';
        this.push(this.stack);
        console.log('stack is ' + this.stack);
        console.log('last is ' + this.last);
    };

    this.inputOperator = function(newOperator) {
        console.log('input ' + newOperator);
        newOperator = String(newOperator);
        if (!newOperator.match(/^(add|sub|mult|div)$/)) {
            console.log('invalid value...');
            return;
        }
        if (this.last !== 'num') {
            this.operator = '';
        }
        if (this.last === 'eq') {
            this.stack = String(this.total);
        }
        if (this.operator) {
            this.calculate();
        } else {
            this.total = parseInt(this.stack, 10);
        }
        this.operator = newOperator;
        this.last = 'op';
        this.push(this.total);
        console.log('total is ' + this.total);
        console.log('operator is ' + this.operator);
        console.log('last is ' + this.last);
    };

    this.clear = function() {
        console.log('operator is clear');
        this.total = 0;
        this.last = 'num';
        this.operator = '';
        this.push(0);
        console.log('total is ' + this.total);
        console.log('stack is ' + this.stack);
        console.log('last is ' + this.last);
        console.log('operator is ' + this.operator);
    };

    this.equal = function() {
        console.log('operator is equal');
        if (this.last === 'op') {
            this.total = parseInt(this.stack, 10);
        }
        if (this.operator) {
            this.calculate();
        } else {
            this.push(this.stack);
        }
        this.display(this.total);
        this.last = 'eq';
        console.log('operator is ' + this.operator);
        console.log('last is ' + this.last);
    };

    this.calculate= function() {
        console.log('start calculate...');
        switch (this.operator) {
        case 'add':
            this.total = this.total + parseInt(this.stack, 10);
            break;
        case 'sub':
            this.total = this.total - parseInt(this.stack, 10);
            break;
        case 'mult':
            this.total = this.total * parseInt(this.stack, 10);
            break;
        case 'div':
            if (this.total == 0 || parseInt(this.stack, 10) == 0) {
                this.total = 0;
            } else {
                this.total = this.total / parseInt(this.stack, 10);
            }
            break;
        default:
            break;
        }
        console.log('total is ' + this.total);
        console.log('stack is ' + this.stack);
        console.log('last is ' + this.last);
        console.log('end calculate...');
    };

    this.mCalculate = function(mOperator) {
        console.log('start mCalculate...');
        mOperator = String(mOperator);
        if (!mOperator.match(/^(mAdd|mSub|mResult|mClear)$/)) {
            console.log('invalid value...');
            return;
        }
        var exp = parseInt(this.stack);
        console.log('exp is ' + exp);
        console.log('mOperator is ' + mOperator);
        switch (mOperator) {
        case 'mAdd':
            this.mTotal = this.mTotal + exp;
            break;
        case 'mSub':
            this.mTotal = this.mTotal - exp;
            break;
        case 'mResult':
            this.display(this.mTotal);
            break;
        case 'mClear':
            this.mTotal = 0;
            break;
        default:
            break;
        }
        this.last = 'op';
        console.log('mTotal is ' + this.mTotal);
        console.log('total is ' + this.total);
        console.log('last is ' + this.last);
        console.log('end mCalculate...');
    };
};
SampleCalc.prototype.display = function(value) {
    $('#screen').text(String(parseInt(value))); // 小数点を無視するので丸めてる
};

$(function() {
    var calc = new SampleCalc();
    $('.num').each(function() {
        var value = $(this).data('value');
        $(this).click(function() {
            calc.inputValue(value);
        });
    });
    $('.op').each(function() {
        var operator = $(this).data('value');
        $(this).click(function() {
            calc.inputOperator(operator);
        });
    });
    $('#buttonClear').click(function() {
        calc.clear();
    });
    $('#buttonEqual').click(function() {
        calc.equal();
    });
    $('.mOp').each(function() {
        var operator = $(this).data('value');
        $(this).click(function() {
            calc.mCalculate(operator);
        });
    });
});
