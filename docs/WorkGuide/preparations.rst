==============================
作業を始めるその前に。
==============================
プログラミングを始める前にindex.html、js/sampleCalc.jsの中も覗いてみましょう。電卓の **見た目** や基本的なプログラムの構造はあらかじめこちらの方で勝手書いておきました。イチからやるのも楽しいですが、今回はサンくらいから始めましょう。

index.html
===============

::

    <div id="buttonAdd" class="button op opFree" data-value="add">+</div>
    ...
    <div id="buttonMAdd" class="button mOp" data-value="mAdd">m+</div>
    ...
    <div id="button7" class="button num" data-value="7">7</div>

全てのボタンに個別のID属性を持たせて、一意にDOMアクセスしやすいようにしています。が、実際に使う事はないかもしれません。class属性にはデザイン分離によるCSSの都合で複数のクラスを指定しています。クラス名のうち、数字のボタンには **num** [#num]_ を、演算子には **op** [#op]_ を、メモリー計算用には **mOp** [#mOp]_ を割り当てています。こちらはグループ化する場合にも役に立つと思います。

.. note::

    他にも幾つかクラスを割り当てられている要素がありますが、ほとんどデザイン上の都合ですので無視してください。

もうひとつ、各ボタンにはdata-value属性を持たせて値を格納しています。ボタンを押したとき、プログラムにどのボタンが押されたのか知らせる必要がありますので、この値を参照して渡す事にします。data-value属性はjQueryからも簡単に扱えます。タグに紐づかせたいデータなどがある場合に便利です。

.. note::

    data-\*属性はW3Cで検討されているHTML5の仕様の一つですが（ `3.2 Elements — HTML5 <http://www.w3.org/TR/html5/elements.html#embedding-custom-non-visible-data-with-the-data-attributes>`_ ）、jQueryでは以前より同様の仕組みがありました。HTML5への採用、仕様の検討を受け同じように扱える仕組みが導入されました（ `.data() – jQuery API <http://api.jquery.com/data/>`_ ）。


    とはいえ、両者には若干の違いがあり注意が必要な場合もあります。興味がある方は調べてみるといいですよ。

js/sampleCalc.js
=================

::

    function SampleCalc() {
       this.total = 0;
       this.stack = '0';
       this.operator = '';
       this.last = 'num'; // 'num': 数字, 'op': 演算子

       this.mTotal = 0;
    }

一番最初には **new** を使って呼び出される事を想定した **コンストラクタ** 関数を用意しています。このコンストラクタが行う事は変数の初期化です。変数名が適当なので気になる方は各自適当に変更してください :-)

足し算を例に計算式を考えると、

::

    足される数 + 足す数  = 答え

となります。数値が二つあって、どのように計算するのか演算子があって、それで答えが出ます。出た答えは、そのまま続けて計算を行う場合には **足される数** になりますので同じものとして扱えそうです。という事で、数値の保持する変数と演算子を保持する変数、それぞれ一つずつ三つの変数が必要そうです。

それから複数桁の数値を入力する場合には連続して数字を入力します。そして、演算子などの他の入力が行われるとそれまでに入力されていた数字を数値として確定します。直前の入力が何であったかを知る必要がありそうです。これにも一つ変数を用意します。

最後にメモリー計算用の変数も一つ用意しておきます。こちらは計算に必要な変数は流用できるので、足される数（応え）の一つだけです。

* total
    第一項（足される数）と計（答え）を保持する。
* stack
    第二項（足す数）を保持する。
* operator
    演算子を保持する。
* last
    直前の入力が何であったかを保持する。 **num** だったら数字、 **op** だったら演算子など。
* mTotal
    メモリー計算用の第一項を保持する。

::

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


.. rubric:: 脚注

.. [#num] Numberの略。
.. [#op] Operationの略。
.. [#mOp] Memory Operationの略。
