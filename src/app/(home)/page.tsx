import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/toggle-mode";
import { ArrowRight, Database, Phone, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 主要内容区域 */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-3xl space-y-10">
          {/* 系统标题 */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-6">
                <Database className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              实时网络监控平台
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              实时监控网络请求状态，快速定位和排查网络访问问题
            </p>
          </div>

          {/* 进入系统按钮 */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="text-lg px-12 py-6">
              <Link href="/light">
                进入系统
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* 系统信息和公告 */}
          <div className="grid gap-6 pt-6">
            {/* 联系信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">联系信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">开发人员</p>
                      <p className="font-medium">胡洪伟</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">联系电话</p>
                      <p className="font-medium">19905880291</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 系统公告 */}
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">系统公告</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>系统正常运行中</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      如需帮助，请点击系统内的
                      <Link href="/guide" className="mx-1 underline underline-offset-2 hover:text-foreground">
                        使用手册
                      </Link>
                      查看详细说明
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 底部信息 */}
      <footer className="border-t border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 实时网络监控平台
          </p>
          <ModeToggle />
        </div>
      </footer>
    </div>
  );
}
