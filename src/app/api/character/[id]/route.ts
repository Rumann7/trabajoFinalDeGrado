import { NextResponse } from "next/server";

export function DELETE(request: any, { params }: any) {
  console.log(params);
  return NextResponse.json({
    message: `eliminando ${params.id}`,
  });
}

export function PUT(request: any, { params }: any) {
  console.log(params);
  return NextResponse.json({
    message: `actualizando ${params.id}`,
  });
}
