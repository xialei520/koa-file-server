import Koa, { DefaultContext, DefaultState, Context } from "koa";
import koaStatic from "koa-static";
import path from "path";

import etag from "koa-etag";
import staticCache from "koa-static-cache";
import koaCG from "koa-conditional-get";

const app: Koa<DefaultContext, DefaultState> = new Koa();

app.use(koaCG());
// app.use(
//     staticCache(path.resolve(__dirname, "static"), {
//         maxAge: 12,
//         cacheControl: "no-store"
//     })
// );
// app.use(etag());
app.use(
    koaStatic(path.resolve(__dirname, "static"), {
        index: "index.html",
        gzip: true, //压缩
        setHeaders(res: any, _path: string, stats: any) {
            // console.log("99", res.get("Last-Modified"));
            //设置强缓存
            res.setHeader("Cache-Control", "max-age=5");
            // res.setHeader("last-modified", stats.mtime);
            // res.setHeader("expires", new Date("2022-10-13 16:00:59"));
        }
    })
);
app.use(async (ctx: Context) => {
    // console.log(ctx, "lll");
    // if (ctx.req.headers["if-modified-since"]) {
    //     console.log(ctx.req.headers["if-modified-since"]);
    // }
    ctx.body = "响应成功";
});
app.listen(8888, "192.168.0.122", () => {
    console.log(`服务器启动成功，running at http://localhost:8888`);
});
