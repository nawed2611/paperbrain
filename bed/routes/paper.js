// add routes
router.get('/', function (req, res, next) {
    res.json({
        message: "Hello PaperBrain"
    })
}
);
router.get('/starredPapers', function (req, res, next) {
    res.json({
        message: "Hello PaperBrain"
    })
}
);
router.get('/starPaper', function (req, res, next) {
    res.json({
        message: "Hello PaperBrain"
    })
}
);
router.get('/unstarPaper', function (req, res, next) {
    res.json({
        message: "Hello PaperBrain"
    })
}
);

module.exports = router;
