"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="text-lg font-bold">
          My Blog
        </Link>

        {/* 데스크탑 네비게이션 */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              홈
            </Link>
          </li>
          <li>
            <Link href="/posts" className="hover:underline">
              블로그
            </Link>
          </li>
          <li>
            <Link href="/categories" className="hover:underline">
              카테고리
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          {/* 인증된 사용자에게만 '새 글 작성' 링크 표시 */}
          <SignedIn>
            <li>
              <Link href="/admin/posts/create" className="hover:underline">
                새 글 작성
              </Link>
            </li>
          </SignedIn>
        </ul>

        {/* 인증 상태에 따른 UI */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                로그인
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* 검색 버튼 */}
        <Button variant="ghost" className="hidden md:block">
          <Search className="w-5 h-5" />
        </Button>

        {/* 모바일 햄버거 메뉴 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:underline">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:underline">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:underline">
                  카테고리
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              {/* 모바일 메뉴에 인증된 사용자에게만 '새 글 작성' 링크 표시 */}
              <SignedIn>
                <li>
                  <Link href="/admin/posts/create" className="hover:underline">
                    새 글 작성
                  </Link>
                </li>
              </SignedIn>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
