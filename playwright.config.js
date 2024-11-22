const config = {
    timeout: 0, //disable test timeout by setting it to 
    workers: 1, //run the tests sequentially i.e, one at a time
    use: { 
        baseURL: 'https://bitheap.tech',
        headless: false,
        slowMo: 2000, //add 2 seconds delay between actions
    },
    projects:[
        {
            name: 'Chromium',
            use: {
                browserName: 'chromium',
                launchOptions: {
                    args: ['--start-maximized'] //maximize the browser
                    
                },
            },
        },
        {
            name: 'Firefox',
            use: {
                browserName: 'firefox',
                launchOptions: {
                    args: ['--start-maximized']
                    //slowMo: 2000,
                },
            },
        },
        {
            name: 'WebKit',
            use: {
                browserName: 'webkit',
                launchOptions: {
                    args: ['--start-maximized'] 
                    //slowMo: 2000,               
                },
            },
        },
    ],
}

export default config
