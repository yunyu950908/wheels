/*
* dependence: jquery
* Waterfall.init($(selector));
* author：yunyu950908
* */

const Waterfall = (function () {
    function Waterfall($ct) {
        this.$ct = $ct;
        this.$items = null;
        this.itemWidth = 0;
        this.colNum = 0;
        this.colSumHeight = [];
        this.render();
        this.resize()
    }

    Waterfall.prototype = {

        render: function () {
            this.$items = this.$ct.children();
            this.itemWidth = this.$items.outerWidth(true);
            this.colNum = parseInt($(window).width() / this.itemWidth);
            for (let i = 0; i < this.colNum; i++) {
                this.colSumHeight[i] = 0
            }
            this.$items.each(e => {
                let minVal = Math.min.apply(null, this.colSumHeight);
                let minIndex = this.colSumHeight.indexOf(minVal);
                $(e).css({
                    top: this.colSumHeight[minIndex],
                    left: this.itemWidth * minIndex
                });
                this.colSumHeight[minIndex] += $(e).outerHeight(true)
            })
        },

        resize: function () {
            $(window).on("resize", () => {
                this.render()
            })
        }
    };

    return {
        init: function ($ct) {
            new waterfall($ct)
        }
    }
})();

