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
    deepEqual($('#screen').text(), '1');
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
    deepEqual($('#screen').text(), '2');
});
test('double figures', function() {
    this.calc.inputValue('2');
    this.calc.inputValue('3');
    deepEqual(this.calc.stack, '23');
    deepEqual(this.calc.last, 'num');
    deepEqual($('#screen').text(), '23');
});
test('zero start double figures', function() {
    this.calc.inputValue('0');
    this.calc.inputValue('4');
    deepEqual(this.calc.stack, '4');
    deepEqual(this.calc.last, 'num');
    deepEqual($('#screen').text(), '4');
});
test('zero start triple figures', function() {
    this.calc.inputValue('0');
    this.calc.inputValue('5');
    this.calc.inputValue('6');
    deepEqual(this.calc.stack, '56');
    deepEqual(this.calc.last, 'num');
    deepEqual($('#screen').text(), '56');
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
//test('input second

module('clear', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
module('equal', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
module('calculate', {
    setup: function() {
        this.calc = new SampleCalc();
    }
});
module('mCalculate', {
    setup: function() {
        this.calc = new SampleCalc();
    }
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
    deepEqual($('#screen').text(), '3');
});
