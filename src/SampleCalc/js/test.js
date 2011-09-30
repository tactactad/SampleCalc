module('initalize', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('initialize', function() {
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.stack, '0');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.last, 'num');
    deepEqual(this.calc.mTotal, 0);
});

module('display', {
    setup: function() {
        this.calc = new SampleCalc();
        this.calc.display(1);
    }
});
test('display', function() {
    setTimeout(function() {
        deepEqual($('#screen').text(), '1');
    }, 500);
});

module('push', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('push', function() {
    this.calc.push(1);
    deepEqual(this.calc.stack, '1');
    notDeepEqual(this.calc.stack, 1);
});

module('inputValue', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('single figure', function() {
    this.calc.inputValue('2');
    deepEqual(this.calc.stack, '2');
    deepEqual(this.calc.last, 'num');
    setTimeout(function() {
        deepEqual($('#screen').text(), '2');
    }, 500);
});
test('double figures', function() {
    this.calc.inputValue('2');
    this.calc.inputValue('3');
    deepEqual(this.calc.stack, '23');
    deepEqual(this.calc.last, 'num');
    setTimeout(function() {
        deepEqual($('#screen').text(), '23');
    }, 500);
});
test('zero start double figures', function() {
    this.calc.inputValue('0');
    this.calc.inputValue('4');
    deepEqual(this.calc.stack, '4');
    deepEqual(this.calc.last, 'num');
    setTimeout(function() {
        deepEqual($('#screen').text(), '4');
    }, 500);
});
test('zero start triple figures', function() {
    this.calc.inputValue('0');
    this.calc.inputValue('5');
    this.calc.inputValue('6');
    deepEqual(this.calc.stack, '56');
    deepEqual(this.calc.last, 'num');
    setTimeout(function() {
        deepEqual($('#screen').text(), '56');
    }, 500);
});
test('input after equal', function() {
    this.calc.inputValue(2);
    this.calc.inputOperator('add');
    this.calc.inputValue(3);
    this.calc.equal();
    this.calc.inputValue(4);
    deepEqual(this.calc.stack, '4');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, 4);
    this.calc.equal();
    deepEqual(this.calc.stack, '4');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, 4);
});
test('validate', function() {
    this.calc.inputValue('11');
    deepEqual(this.calc.stack, '0');
    this.calc.inputValue('a');
    deepEqual(this.calc.stack, '0');
    this.calc.inputValue('-1');
    deepEqual(this.calc.stack, '0');
    this.calc.inputValue(9);
    this.calc.inputValue('aaa');
    deepEqual(this.calc.stack, '9');
});

module('inputOperator', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('input first', function() {
    this.calc.inputOperator('add');
    deepEqual(this.calc.operator, 'add');
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.last, 'op');
});
test('input second', function () {
    this.calc.inputOperator('add');
    this.calc.inputOperator('sub');
    deepEqual(this.calc.operator, 'sub');
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.last, 'op');
});
test('input after equal', function() {
    this.calc.inputValue(2);
    this.calc.inputOperator('add');
    this.calc.inputValue(3);
    this.calc.equal();
    this.calc.inputOperator('mult');
    deepEqual(this.calc.stack, '5');
    deepEqual(this.calc.operator, 'mult');
    deepEqual(this.calc.total, 5);
    this.calc.inputValue(3);
    this.calc.equal();
    deepEqual(this.calc.stack, '3');
    deepEqual(this.calc.operator, 'mult');
    deepEqual(this.calc.total, 15);
});
test('validate', function() {
    this.calc.inputOperator('mAdd');
    deepEqual(this.calc.operator, '');
    this.calc.inputOperator(5);
    deepEqual(this.calc.operator, '');
    this.calc.mCalculate('mResult');
    deepEqual(this.calc.operator, '');
});


module('clear', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('input first', function() {
    this.calc.clear();
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.last, 'num');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.stack, '0');
    deepEqual($('#screen').text(), '0');
});
test('input later', function() {
    this.calc.inputValue(3);
    this.calc.inputValue(5);
    this.calc.inputOperator('add');
    this.calc.inputOperator('equal');
    this.calc.clear();
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.last, 'num');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.stack, '0');
});

module('equal', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('continuously calculate', function() {
    this.calc.inputValue(2);
    this.calc.inputOperator('add');
    this.calc.equal();
    deepEqual(this.calc.total, 4);
    deepEqual(this.calc.stack, '2');
    deepEqual(this.calc.operator, 'add');
    deepEqual(this.calc.last, 'eq');
    this.calc.equal();
    this.calc.equal();
    deepEqual(this.calc.total, 8);
    deepEqual(this.calc.stack, '2');
    deepEqual(this.calc.operator, 'add');
    deepEqual(this.calc.last, 'eq');
});

module('calculate', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('calculate add', function() {
    this.calc.inputValue('2');
    this.calc.inputOperator('add');
    this.calc.inputValue('3');
    this.calc.equal();
    deepEqual(this.calc.operator, 'add');
    deepEqual(this.calc.total, 5);
    deepEqual(this.calc.last, 'eq');
    deepEqual(this.calc.stack, '3'); // equalの時にはtotalをstackにコピーしない。
});
test('calculate sub', function() {
    this.calc.inputValue(2);
    this.calc.inputOperator('sub');
    this.calc.inputValue(3);
    this.calc.equal();
    deepEqual(this.calc.operator, 'sub');
    deepEqual(this.calc.total, -1);
    deepEqual(this.calc.stack, '3');
});
test('calcute mult', function() {
    this.calc.inputValue(2);
    this.calc.inputOperator('mult');
    this.calc.inputValue(3);
    this.calc.inputOperator('add');
    deepEqual(this.calc.operator, 'add');
    deepEqual(this.calc.total, 6);
    deepEqual(this.calc.stack, '6');
});
test('calculate div', function() {
    this.calc.inputOperator('div');
    this.calc.inputValue(4);
    this.calc.equal();
    deepEqual(this.calc.operator, 'div');
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.stack, '4');
    this.calc.inputValue(6);
    this.calc.inputOperator('div');
    this.calc.inputValue(2);
    this.calc.equal();
    deepEqual(this.calc.total, 3);
    deepEqual(this.calc.stack, '2');
});

module('mCalculate', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
test('m+', function() {
    this.calc.inputValue('5');
    this.calc.mCalculate('mAdd');
    this.calc.inputValue(4);
    this.calc.mCalculate('mAdd');
    deepEqual(this.calc.mTotal, 9);
});
test('m-', function() {
    this.calc.inputValue('5');
    this.calc.mCalculate('mAdd');
    this.calc.inputValue(4);
    this.calc.mCalculate('mSub');
    deepEqual(this.calc.mTotal, 1);
});
test('mr', function() {
    this.calc.inputValue('1');
    this.calc.inputValue('5');
    this.calc.mCalculate('mAdd');
    this.calc.mCalculate('mResult');
    deepEqual(this.calc.mTotal, 15);
    deepEqual(this.calc.stack, '15');
});
test('mc', function() {
    this.calc.inputValue('1');
    this.calc.mCalculate('mAdd');
    this.calc.mCalculate('mResult');
    deepEqual(this.calc.mTotal, 1);
    this.calc.mCalculate('mClear');
    deepEqual(this.calc.mTotal, 0);
});
test('validate', function() {
    this.calc.mCalculate('mResult');
    this.calc.mCalculate('add');
    this.calc.mCalculate(5);
});

module('buttonClick', {
    setup: function() {
        this.calc = new SampleCalc();
        var theThis = this;
        $('#button3').click(function() {
            theThis.calc.inputValue(3);
        });
    }
});
test('numButton clicked', function() {
    $('#button3').click();
    setTimeout(function() {
        deepEqual($('#screen').text(), '3');
    }, 500);
});
