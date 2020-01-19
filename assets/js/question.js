var sel
var ctdown
var currentQC
var score
var database = [{
        q: 'Why so JavaScript and Java have similar name?',
        c: {
            1: 'JavaScript\'s syntax is loosely based on Java\'s',
            2: 'JavaScript is a stripped-down version of Javas',
            3: 'Both of above',
            4: 'None of above'
        },
        a: 1
    },

    {
        q: 'What are variables used for in JavaScript Programs?',
        c: {
            1: 'Storing numbers, dates, or other values',
            2: 'Varying randomly',
            3: 'Causing high-school algebra flashbacks',
            4: 'None of the above'
        },
        a: 1
    },

    {
        q: 'Which of the following can\'t be done with client-side JavaScript?',
        c: {
            1: 'Validating a form',
            2: 'Sending a form\'s contents by email',
            3: 'Storing the form\'s contents to a database file on the server',
            4: 'None of the above'
        },
        a: 3
    },

    {
        q: 'Which tag is an extension to HTML that can enclose any number of JavaScript statements.',
        c: {
            1: 'SCRIPT',
            2: 'TITLE',
            3: 'BODY',
            4: 'HEAD'
        },
        a: 1
    },

    {
        q: 'Which method of an Array object adds and/or removes elements from an array.?',
        c: {
            1: 'Reverse',
            2: 'Shift',
            3: 'Slice',
            4: 'Splice'
        },
        a: 4
    }
]

function main() {
    makeQC(database)
    ctdown = 7500
    document.getElementById('time').textContent = Math.floor(ctdown / 100)
    score = 0
    setInterval(function() {
        document.getElementById('time').textContent = Math.floor(ctdown / 100)
        if (ctdown > 0) {
            ctdown--
        } else {
            jump2score()
        }
    }, 10)
}

function makeQC(obj) {
    console.log('dmsg: makeQC')
    sel = generateSelector(obj)
    loadQC(obj, sel)
    document.getElementById('score').textContent = score
}

function generateSelector(obj) {
    console.log('dmsg: generateSelector')
    var n = obj.length
    return Math.floor(
        (window.crypto.getRandomValues(new Uint32Array(2))[0] / 0xffffffff) * n
    )
}

function loadQC(obj, index) {
    console.log('dmsg: loadQC')
    renderQC(obj[index])
    currentQC = obj.splice(index, 1)
}

function renderQC(obj) {
    console.log('dmsg: renderQC')
    console.dir(Object.keys(obj))
    console.log(obj.q)
    console.dir(document.getElementsByTagName('h3'))
    document.getElementById('question').textContent = obj.q
    console.dir(document.getElementsByTagName('h3'))
    document.getElementById('choice').innerHTML = ''
    for (var key in obj.c) {
        var cDiv = document.createElement('div')
        var cBtn = document.createElement('button')
        cBtn.classList.add('btn', 'btn-primary', 'v-left')
        cBtn.id = key
        console.log(key)
        console.dir(obj.c[key])
        cBtn.textContent = obj.c[key]
        document.getElementById('choice').appendChild(cDiv)
        cDiv.appendChild(cBtn)
        console.dir(cBtn)
    }
}

function jump2score() {
    score += ctdown / 5
    ctdown = 0
    window.localStorage.setItem('score', score)
    console.log(window.localStorage.getItem('score'))
    document.location.href = 'highscore.html'
}

main()
document.querySelector('#choice').addEventListener('click', function(e) {
    console.log('dmsg: chka')
    var userSel = Number(e.target.id)
    if (userSel === currentQC[0].a) {
        score += 300
        document.getElementById('score').textContent = score
        document.querySelector('.answer').textContent = 'Correct!'
        if (database.length > 0) {
            makeQC(database)
        } else {
            jump2score()
        }
    } else {
        document.querySelector('.answer').textContent = 'Wrong!'
        if (ctdown > 1500) {
            ctdown -= 1500
        } else {
            ctdown = 0
        }
    }
})