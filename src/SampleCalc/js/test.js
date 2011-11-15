module('initalize', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
test('initialize', function () {
    expect(5);
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.stack, '0');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.last, 'num');
    deepEqual(this.calc.mTotal, 0);
});

module('display', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
asyncTest('display', function () {
    expect(1);
    this.calc.display(1);
    setTimeout(function () {
        deepEqual($('#screen').text(), '1');
        start();
    }, 500);
});

module('push', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
test('push', function () {
    expect(2);
    this.calc.push(1);
    deepEqual(this.calc.stack, '1');
    notDeepEqual(this.calc.stack, 1);
});

module('inputValue', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
test('single figure', function () {
    expect(2);
    this.calc.inputValue('2');
    deepEqual(this.calc.stack, '2');
    deepEqual(this.calc.last, 'num');
});
test('double figures', function () {
    expect(2);
    this.calc.inputValue('2');
    this.calc.inputValue('3');
    deepEqual(this.calc.stack, '23');
    deepEqual(this.calc.last, 'num');
});
test('zero start double figures', function () {
    expect(2);
    this.calc.inputValue('0');
    this.calc.inputValue('4');
    deepEqual(this.calc.stack, '4');
    deepEqual(this.calc.last, 'num');
});
test('zero start triple figures', function () {
    expect(2);
    this.calc.inputValue('0');
    this.calc.inputValue('5');
    this.calc.inputValue('6');
    deepEqual(this.calc.stack, '56');
    deepEqual(this.calc.last, 'num');
});
test('decimal', function () {
    expect(4);
    this.calc.inputValue('dec');
    deepEqual(this.calc.stack, '0.');
    this.calc.inputValue(5);
    deepEqual(this.calc.stack, '0.5');
    deepEqual(this.calc.last, 'num');
    this.calc.clear();
    this.calc.inputValue(2);
    this.calc.inputValue('dec');
    this.calc.inputValue('2');
    deepEqual(this.calc.stack, '2.2');
});
test('input after equal', function () {
    expect(6);
    this.calc.inputValue(2);
    this.calc.inputOperator('add');
    this.calc.inputValue(3);
    this.calc.equal();
    this.calc.inputValue(4);
    deepEqual(this.calc.stack, '4');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, 5);
    this.calc.equal();
    deepEqual(this.calc.stack, '4');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, 4);
});
test('input after operator', function () {
    expect(4);
    this.calc.inputValue(2);
    this.calc.inputOperator('add');
    this.calc.inputValue(3);
    deepEqual(this.calc.stack, '3');
    this.calc.inputValue(5);
    deepEqual(this.calc.stack, '35');
    this.calc.inputOperator('mult');
    deepEqual(this.calc.stack, '37');
    this.calc.inputValue('dec');
    this.calc.inputValue(5);
    deepEqual(this.calc.stack, '0.5');
});
test('validate', function () {
    expect(7);
    this.calc.inputValue('11');
    deepEqual(this.calc.stack, '0');
    this.calc.inputValue('a');
    deepEqual(this.calc.stack, '0');
    this.calc.inputValue('-1');
    deepEqual(this.calc.stack, '0');
    this.calc.inputValue(9);
    this.calc.inputValue('aaa');
    deepEqual(this.calc.stack, '9');
    this.calc.inputValue('dec');
    deepEqual(this.calc.stack, '9.');
    this.calc.inputValue('9');
    deepEqual(this.calc.stack, '9.9');
    this.calc.inputValue('dec');
    deepEqual(this.calc.stack, '9.9');
});

module('inputOperator', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
test('input first', function () {
    expect(3);
    this.calc.inputOperator('add');
    deepEqual(this.calc.operator, 'add');
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.last, 'op');
});
test('input second', function () {
    expect(3);
    this.calc.inputOperator('add');
    this.calc.inputOperator('sub');
    deepEqual(this.calc.operator, 'sub');
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.last, 'op');
});
test('input after equal', function () {
    expect(6);
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
    deepEqual(this.calc.stack, '15');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, 15);
});
test('validate', function () {
    expect(3);
    this.calc.inputOperator('mAdd');
    deepEqual(this.calc.operator, '');
    this.calc.inputOperator(5);
    deepEqual(this.calc.operator, '');
    this.calc.mCalculate('mResult');
    deepEqual(this.calc.operator, '');
});


module('clear', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
test('input first', function () {
    expect(5);
    this.calc.clear();
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.last, 'num');
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.stack, '0');
    deepEqual($('#screen').text(), '0');
});
test('input later', function () {
    expect(4);
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
    setup: function () {
        this.calc = new SampleCalc();
    }
});

module('calculate', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
test('calculate add', function () {
    expect(6);
    this.calc.inputValue('2');
    this.calc.inputOperator('add');
    this.calc.inputValue('3');
    this.calc.equal();
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, 5);
    deepEqual(this.calc.last, 'eq');
    deepEqual(this.calc.stack, '5');
    this.calc.inputOperator('add');
    this.calc.inputValue(2);
    this.calc.inputValue('dec');
    this.calc.inputValue(5);
    this.calc.equal();
    deepEqual(this.calc.stack, '7.5');
    deepEqual(this.calc.total, 7.5);
});
test('calculate sub', function () {
    expect(4);
    this.calc.inputValue(2);
    this.calc.inputOperator('sub');
    this.calc.inputValue(3);
    this.calc.equal();
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, -1);
    deepEqual(this.calc.stack, '-1');
    this.calc.inputOperator('sub');
    this.calc.inputValue(1);
    this.calc.inputValue('dec');
    this.calc.inputValue('3');
    this.calc.equal();
    deepEqual(this.calc.stack, '-2.3');
});
test('calcute mult', function () {
    expect(4);
    this.calc.inputValue(2);
    this.calc.inputOperator('mult');
    this.calc.inputValue(3);
    this.calc.inputOperator('add');
    deepEqual(this.calc.operator, 'add');
    deepEqual(this.calc.total, 6);
    deepEqual(this.calc.stack, '6');
    this.calc.inputOperator('mult');
    this.calc.inputValue('dec');
    this.calc.inputValue(5);
    this.calc.equal();
    deepEqual(this.calc.stack, '3');
});
test('calculate div', function () {
    expect(6);
    this.calc.inputOperator('div');
    this.calc.inputValue(4);
    this.calc.equal();
    deepEqual(this.calc.operator, '');
    deepEqual(this.calc.total, 0);
    deepEqual(this.calc.stack, '0');
    this.calc.inputValue(6);
    this.calc.inputOperator('div');
    this.calc.inputValue(2);
    this.calc.equal();
    deepEqual(this.calc.total, 3);
    deepEqual(this.calc.stack, '3');
    this.calc.inputOperator('div');
    this.calc.inputValue('dec');
    this.calc.inputValue(5);
    this.calc.equal();
    deepEqual(this.calc.stack, '6');
});

module('mCalculate', {
    setup: function () {
        this.calc = new SampleCalc();
    }
});
test('m+', function () {
    expect(2);
    this.calc.inputValue('5');
    this.calc.mCalculate('mAdd');
    this.calc.inputValue(4);
    this.calc.mCalculate('mAdd');
    deepEqual(this.calc.mTotal, 9);
    this.calc.inputValue('dec');
    this.calc.inputValue(5);
    this.calc.mCalculate('mAdd');
    deepEqual(this.calc.mTotal, 9.5);
});
test('m-', function () {
    expect(2);
    this.calc.inputValue('5');
    this.calc.mCalculate('mAdd');
    this.calc.inputValue(4);
    this.calc.mCalculate('mSub');
    deepEqual(this.calc.mTotal, 1);
    this.calc.inputValue('dec');
    this.calc.inputValue(5);
    this.calc.mCalculate('mSub');
    deepEqual(this.calc.mTotal, 0.5);
});
test('mr', function () {
    expect(2);
    this.calc.inputValue('1');
    this.calc.inputValue('5');
    this.calc.mCalculate('mAdd');
    this.calc.mCalculate('mResult');
    deepEqual(this.calc.mTotal, 15);
    deepEqual(this.calc.stack, '15');
});
test('mc', function () {
    expect(2);
    this.calc.inputValue('1');
    this.calc.mCalculate('mAdd');
    this.calc.mCalculate('mResult');
    deepEqual(this.calc.mTotal, 1);
    this.calc.mCalculate('mClear');
    deepEqual(this.calc.mTotal, 0);
});
test('validate', function () {
    this.calc.mCalculate('mResult');
    this.calc.mCalculate('add');
    this.calc.mCalculate(5);
});

module('buttonClick', {
    setup: function () {
        this.calc = new SampleCalc();
        var theThis = this;
        $('#button3').click(function () {
            theThis.calc.inputValue(3);
        });
    }
});
asyncTest('numButton clicked', function () {
    expect(1);
    $('#button3').click();
    setTimeout(function () {
        deepEqual($('#screen').text(), '3');
        start();
    }, 500);
});
