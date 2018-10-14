angular.module("APP", [])

angular.module("APP").controller(
    "controllers", function ($scope, $location, $anchorScroll,$timeout) {
        console.log("INSIDE APP CTRL");

        $scope.bigshow = false;
        $scope.count = 1;
        $scope.currentimg = {};

        // BUILD imgs array representing the gallery imgs list

        // if (photolength) {
        //     for (var i = 0; i < photolength; i++) {
        //         var img = {};
        //         img.url = "/images/" + htitle + "/pp(" + (i + 1) + ").jpg";
        //         $scope.imgs.push(img);
        //         // (new Image()).src = "html/3archi-neering/uiux/" + i + "/img(" + j + ").png";
        //     }
        // }
        // else {
        //     for (var i = 0; i < urls.length; i++) {
        //         var img = {};
        //         img.url = urls[i];
        //         $scope.imgs.push(img);
        //     }
        // }


        $scope.openimg = function (i) {
            console.log("params", i);
            $scope.bigshow = true;
            $scope.count = i + 1;
            $scope.currentimg = imgs[$scope.count - 1];
            console.log("OPENED BIG", $scope.currentimg, $scope.bigshow);
        }

        // $scope.openimgspecial = function (u) {
        //     console.log("parmas", u);
        //     $scope.bigshow = true;
        //     $scope.currentimg.url = u;
        //     console.log("OPENED BIG", $scope.currentimg, $scope.bigshow);
        // }

        $scope.hidebig = function () {
            $scope.bigshow = false;
            $location.hash('imgs');
            console.log("prehash", $location.hash());
            //need some time for the DOM rendering back. then we can scroll.
            // also, if hash is not changed, we need to manually call scroll.
            $timeout(f, 30);
            function f() {
                $anchorScroll();
                console.log("posthash", $location.hash());
            }
            console.log("midhash", $location.hash());

        }

        $scope.detailprev = function () {
            var l = imgs.length;
            $scope.count = ($scope.count > 1) ? ($scope.count - 1) : l;
            $scope.currentimg = imgs[$scope.count - 1];
            // $scope.currentimg.url = "/images/" + htitle + "/pp(" + $scope.count + ").jpg";
        }

        $scope.detailnext = function () {
            var l = imgs.length;
            $scope.count = ($scope.count < l) ? ($scope.count + 1) : 1;
            $scope.currentimg = imgs[$scope.count - 1];
            // $scope.currentimg.url = "/images/" + htitle + "/pp(" + $scope.count + ").jpg";
        }

        $scope.postprev = function () {
            window.location.href = prev
        }

        $scope.postnext = function () {
            window.location.href = next
        }

    })

    .directive("detailSwipe", function () {
        return {
            link: function (s, e, a) {
                var h = new Hammer(e[0]); // first one is the RAW HTML DOM
                h.on("swiperight", function (ev) {
                    console.log(ev.type);
                    s.$apply(function () {
                        s.detailprev();
                    })
                })

                h.on("swipeleft", function (ev) {
                    console.log(ev.type);
                    s.$apply(function () {
                        s.detailnext();
                    })
                })
            }
        }

    })


    .directive("postSwipe", function () {
        return {
            link: function (s, e, a) {
                var h = new Hammer(e[0]); // first one is the RAW HTML DOM
                h.on("swiperight", function (ev) {
                    console.log(ev.type);
                    s.postprev();
                })

                h.on("swipeleft", function (ev) {
                    console.log(ev.type);
                    s.postnext();
                })
            }
        }

    })
