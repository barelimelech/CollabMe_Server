/*

describe("Tocken refresh test ",()=>{

    jest.setTimeout(30000);
    test("timeout access", async()=>{
        await new Promise(r => setTimeout(r, 3*1000 ));
        const response = await request(app).get("/offer").set({authorization : 'JWT' + accessToken})
        expect(response.statusCode).not.toEqual(200);
    });

    test("Refresh Token", async () => {
        const response = await request(app).get("/auth/refreshToken").set({authorization : 'JWT ' + refreshToken1})
        expect (response.statusCode).toEqual(200);
        newAccessToken = response.body.accessToken 
        expect (newAccessToken).not.toEqual(null);
        expect(newRefreshToken).not.toEqual(null);
    }); 
});
*/
