define(["knockout", "jquery", "ko.mapping"],
    function(ko, $, ko_mapping){

    ko.bindingHandlers['class'] = {
        'update': function (element, valueAccessor) {
            if (element['__ko__previousClassValue__']) {
                $(element).removeClass(element['__ko__previousClassValue__']);
            }
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).addClass(value);
            element['__ko__previousClassValue__'] = value;
        }
    };

    return function (url, sort, vm) {
        var self = this;
        this.rows = ko.observableArray([]);

        this.$vm = vm;



        this.paging = {
            PageNumber: ko.observable(1),
            TotalPagesCount: ko.observable(0),
            next: function () {
                var pn = this.PageNumber();
                if (pn < this.TotalPagesCount())
                    self.go_to(pn + 1);
            },
            back: function () {
                var pn = this.PageNumber();
                if (pn > 1) 
                    self.go_to(pn - 1);
            }
        };

        this.go_to = function (page) {
            this.paging.PageNumber(page);
        };

        this.sorting = ko_mapping.fromJS(sort);
        this.checkSort = function (fieldSort) {
            if (this.sorting.Field() == fieldSort) {
                return this.sorting.Distinct() == 'asc' ? 'sorting_desc' : 'sorting_asc';
            }
            return '';
        };

        ko.bindingHandlers.sort = {
            init: function (element, valueAccessor) {
                $(element).click(function () {
                    var field = valueAccessor();
                    var dist = self.sorting.Distinct();
                    if (field == self.sorting.Field()) {
                        self.sorting.Distinct(dist == 'asc' ? 'desc' : 'asc');
                    }
                    else {
                        self.sorting.Distinct('asc');
                        self.sorting.Field(field);
                    }
                });
            }
        };

        self.render = function (response) {
            return response;
        };

        self.refresh = function (data) {
            data = data || {};

            var request = $.extend({
                pageNumber: self.paging.PageNumber(),
                sort: ko.toJS(self.sorting)
            }, data);

            $.ajax({
                url: url,
                type: 'POST',
                data: ko.toJSON(request),
                contentType: 'application/json',
                success: function (response) {
                    response = self.render(response);
                    self.rows(response.Data);
                    self.paging.PageNumber(response.Paging.PageNumber);
                    self.paging.TotalPagesCount(response.Paging.TotalPagesCount);
                }
            });
        };

        ko.computed(self.refresh, self).extend({ throttle: 1 });
    };
});