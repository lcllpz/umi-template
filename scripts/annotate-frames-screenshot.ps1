$ErrorActionPreference = 'Stop'
$srcPath = 'C:\Users\lcl\.cursor\projects\e-learn-umi-template\assets\c__Users_lcl_AppData_Roaming_Cursor_User_workspaceStorage_e6e59d50e2945b00c0dbbb6a42037382_images_image-7bf9efd8-3da8-45ae-b53e-1afffbe1bf9d.png'
$outPath = Join-Path $PSScriptRoot '..\src\moment的笔记学习\前端工程化\07. 前端性能指标\动画\frames-性能图-标注.jpg' | Resolve-Path

Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap $src.Width, $src.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.DrawImage($src, 0, 0, $src.Width, $src.Height)

$red = [System.Drawing.Color]::FromArgb(220, 30, 30)
$blue = [System.Drawing.Color]::FromArgb(0, 120, 215)
$orange = [System.Drawing.Color]::FromArgb(230, 120, 0)
$penR = New-Object System.Drawing.Pen $red, 2.5
$penB = New-Object System.Drawing.Pen $blue, 2.2
$penO = New-Object System.Drawing.Pen $orange, 2
$fillNote = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(245, 245, 245))
$fillBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(80, 80, 80)), 1
$font = New-Object System.Drawing.Font 'Microsoft YaHei UI', [single]11.5, [System.Drawing.FontStyle]::Bold
$fontSm = New-Object System.Drawing.Font 'Microsoft YaHei UI', [single]10.0
$brushTxt = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 25, 25))

# 坐标按 1024x552 截图布局估算
# 1) Frames 轨道
$g.DrawLine($penB, 268, 168, 318, 148)
$g.DrawLine($penB, 318, 148, 308, 148)
$g.DrawLine($penB, 318, 148, 312, 138)
$rect1 = New-Object System.Drawing.RectangleF (330, 118, 360, 52)
$g.FillRectangle($fillNote, $rect1)
$g.DrawRectangle($fillBorder, [int]$rect1.X, [int]$rect1.Y, [int]$rect1.Width, [int]$rect1.Height)
$g.DrawString('Frames 轨道：每一根竖条 = 一帧', $font, $brushTxt, 338, 124)
$g.DrawString('条越宽 = 这一帧耗时越长', $fontSm, $brushTxt, 338, 146)

# 2) 第一根长帧
$g.DrawLine($penR, 300, 210, 268, 188)
$g.DrawLine($penR, 268, 188, 278, 188)
$g.DrawLine($penR, 268, 188, 272, 178)
$rect2 = New-Object System.Drawing.RectangleF (310, 188, 400, 58)
$g.FillRectangle($fillNote, $rect2)
$g.DrawRectangle($fillBorder, [int]$rect2.X, [int]$rect2.Y, [int]$rect2.Width, [int]$rect2.Height)
$g.DrawString('长帧 / 掉帧：约 490ms', $font, $brushTxt, 318, 194)
$g.DrawString('远大于 16.7ms（60fps 预算）', $fontSm, $brushTxt, 318, 216)

# 3) 密集细条
$g.DrawLine($penB, 620, 168, 560, 175)
$g.DrawLine($penB, 560, 175, 570, 170)
$rect3 = New-Object System.Drawing.RectangleF (630, 150, 360, 52)
$g.FillRectangle($fillNote, $rect3)
$g.DrawRectangle($fillBorder, [int]$rect3.X, [int]$rect3.Y, [int]$rect3.Width, [int]$rect3.Height)
$g.DrawString('密集细条：持续重绘/动画', $font, $brushTxt, 638, 156)
$g.DrawString('单帧较短但频率高', $fontSm, $brushTxt, 638, 178)

# 4) 条纹警告
$g.DrawLine($penO, 720, 200, 680, 188)
$g.DrawLine($penO, 680, 188, 688, 184)
$rect4 = New-Object System.Drawing.RectangleF (730, 175, 280, 46)
$g.FillRectangle($fillNote, $rect4)
$g.DrawRectangle($fillBorder, [int]$rect4.X, [int]$rect4.Y, [int]$rect4.Width, [int]$rect4.Height)
$g.DrawString('条纹：长帧/未达标警告', $fontSm, $brushTxt, 738, 186)

# 5) 顶部 CPU
$g.DrawLine($penB, 400, 62, 480, 88)
$rect5 = New-Object System.Drawing.RectangleF (250, 28, 320, 44)
$g.FillRectangle($fillNote, $rect5)
$g.DrawRectangle($fillBorder, [int]$rect5.X, [int]$rect5.Y, [int]$rect5.Width, [int]$rect5.Height)
$g.DrawString('上方黄线：CPU 繁忙时段', $fontSm, $brushTxt, 258, 40)

$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), [long]92
$bmp.Save($outPath, $enc, $ep)

$g.Dispose(); $bmp.Dispose(); $src.Dispose()
$penR.Dispose(); $penB.Dispose(); $penO.Dispose(); $fillNote.Dispose(); $fillBorder.Dispose()
$font.Dispose(); $fontSm.Dispose(); $brushTxt.Dispose()

Write-Host "Saved: $outPath"
