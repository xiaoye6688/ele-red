' 定义程序路径
Dim program_path
program_path = "C:\Users\xiaoye\AppData\Local\Programs\ele-red\ele-red.exe"

' 创建 WMI 对象
Dim wmi
Set wmi = GetObject("winmgmts://./root/cimv2")

' 查询进程ele-red.exe是否在运行
Dim query
query = "SELECT * FROM Win32_Process WHERE Name='ele-red.exe'"

Dim result
Set result = wmi.ExecQuery(query)

' 如果进程在运行则关闭，否则启动程序
If result.Count > 0 Then
    ' 关闭进程
    result.ItemIndex(0).Terminate
Else
    ' 启动程序
    CreateObject("WScript.Shell").Run program_path
End If

' 获取进程名称
Function GetProcessName(path)
    Dim fso
    Set fso = CreateObject("Scripting.FileSystemObject")
    
    GetProcessName = fso.GetBaseName(path)
End Function
