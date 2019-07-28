let app = new Vue({
    el: '#app',
    data: {
        project: 'Project Name',
        info_card_type: 'bg-primary',
        current_test: {
            "status": '',
            "time": '',
            "output": [],
            "history_area": {"labels": [], "data": []},
            "history_pie": {"data": []},
            "older_outputs": [],
            "status_col": [],
            "time_col": [],
            "date_col": [],
            "output_col": [],
            "tests_col": []
        },
        showOlderTest: false,
        tmp_current_test: {},
        sheetLink: ''
    },
    created: function () {
        setInterval(() =>
            this.current_test = this.current_test_get(), 2000)
    },
    methods: {
        current_test_get: function () {
            if (this.showOlderTest) {
                return this.current_test;
            } else {
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", 'config.json', false); // false for synchronous request
                xmlHttp.send(null);
                return JSON.parse(xmlHttp.responseText);
            }
        },
        contains: function (base, match) {
            return base.includes(match)
        },
        loadOlderTest: function(element) {
            let index = element.path[1].rowIndex;
            index = index-1;
            this.tmp_current_test = this.current_test;
            this.showOlderTest = true;
            this.info_card_type = 'bg-secondary';
            this.current_test = {
                "status": this.tmp_current_test.status_col[index],
                "time": this.tmp_current_test.time_col[index],
                "output": JSON.parse(this.tmp_current_test.output_col[index].replace(/'/g, '"')),
                "date": this.tmp_current_test.date_col[index],
                "history_area": this.tmp_current_test.history_area,
                "history_pie": this.tmp_current_test.history_pie,
                "older_outputs": this.tmp_current_test.older_outputs,
                "status_col": this.tmp_current_test.status_col,
                "time_col": this.tmp_current_test.time_col,
                "date_col": this.tmp_current_test.date_col,
                "output_col": this.tmp_current_test.output_col,
                "tests_col": this.tmp_current_test.tests_col
            };
        },
        backToCurrentTest: function () {
            this.current_test = this.tmp_current_test;
            this.showOlderTest = false;
            this.info_card_type = 'bg-primary';
        }
    },
    computed: {
        older_outputs: function () {
            let tmp = [];
            let tmp_tmp = []
            for (i = 0; i < this.current_test.older_outputs.length; i++) {
                tmp.push(this.current_test.older_outputs[i].replace(/'/g, '"'));
            }
            for (i = 0; i < tmp.length; i++) {
                tmp_tmp.push((JSON.parse(tmp[i])));
                tmp_tmp.push(["next_test"])
            }
            tmp = [];
            for (i = 0; i < tmp_tmp.length; i++) {
                tmp.push(tmp_tmp[i]);
            }
            return tmp;
        },
        table_rows: function () {
            let rows = [];

            for (i = 0; i < this.current_test.status_col.length; i++) {
                rows.push([]);
                rows[i].push(this.current_test.status_col[i]);
            }
            for (i = 0; i < this.current_test.time_col.length; i++) {
                rows[i].push(this.current_test.time_col[i]);
            }
            for (i = 0; i < this.current_test.date_col.length; i++) {
                rows[i].push(this.current_test.date_col[i]);
            }
            for (i = 0; i < this.current_test.tests_col.length; i++) {
                rows[i].push(this.current_test.tests_col[i]);
            }
            for (i = 0; i < this.current_test.output_col.length; i++) {
                rows[i].push(this.current_test.output_col[i]);
            }
            return rows

        }
    },
});