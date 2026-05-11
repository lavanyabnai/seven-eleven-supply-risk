'use client';

import * as React from 'react';
import {
  Star,
  AlertCircle,
  Search,
  Reply,
  Forward,
  Trash
} from 'lucide-react';

import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarProvider,
  useSidebar
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  mails: [
    {
      id: 1,
      name: 'William Smith',
      email: 'williamsmith@example.com',
      subject: 'Team Meeting Agenda',
      date: '09:34 AM',
      teaser:
        "Here's the agenda for our upcoming team meeting. Please review and let me know if you have any topics to add.",
      body: "Team meeting agenda content",
      starred: true,
      important: false,
      attachments: 1
    },
    {
      id: 2,
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      subject: 'Project Update: Q2 Goals',
      date: 'Yesterday',
      teaser:
        "I've compiled our Q2 goals and progress. Can we schedule a call to discuss the next steps?",
      body: "Hi team,\n\nI hope this email finds you well. I've spent some time compiling our Q2 goals and assessing our progress so far. I think we're making good headway, but there are a few areas where we might need to adjust our strategy.\n\nHere's a quick summary:\n1. Sales targets: On track, exceeding by 5%\n2. Customer acquisition: Slightly behind, need to boost marketing efforts\n3. Product development: New feature launch delayed by two weeks\n4. Team expansion: Successfully onboarded 3 new members\n\nI'd like to schedule a call to discuss these points in more detail and plan our next steps. Could you please let me know your availability for next week?\n\nBest regards,\nAlice",
      starred: false,
      important: true,
      attachments: 2
    },
    {
      id: 3,
      name: 'Bob Anderson',
      email: 'bobanderson@example.com',
      subject: 'Client Presentation Feedback',
      date: '2 days ago',
      teaser:
        "Great job on the client presentation! I've attached some feedback and suggestions for our next meeting.",
      body: "Hello team,\n\nI wanted to take a moment to congratulate everyone on the excellent client presentation yesterday. The client was very impressed with our proposal and the depth of our analysis.\n\nI've attached a document with some detailed feedback and suggestions for our next meeting. Here are the key points:\n\n1. Strong opening and clear value proposition\n2. Effective use of case studies to demonstrate our expertise\n3. Engaging Q&A session\n4. Areas for improvement: More specific timeline for deliverables\n\nLet's discuss these points in our next team meeting to ensure we're fully prepared for the follow-up presentation.\n\nGreat work, everyone!\n\nBest,\nBob",
      starred: true,
      important: true,
      attachments: 1
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emilydavis@example.com',
      subject: 'New Marketing Strategy',
      date: '3 days ago',
      teaser:
        "I've outlined a new marketing strategy for our product launch. Looking forward to your thoughts!",
      body: "Dear team,\n\nI hope this email finds you well. I'm excited to share with you a new marketing strategy I've been working on for our upcoming product launch.\n\nKey elements of the strategy include:\n1. Influencer partnerships\n2. Social media campaign with user-generated content\n3. Limited-time launch offers\n4. Webinar series showcasing product features\n\nI've attached a detailed document outlining each aspect of the strategy, including timelines and budget allocations. I'd love to get your feedback and suggestions before we finalize the plan.\n\nPlease review the document and let's schedule a meeting to discuss it further.\n\nBest regards,\nEmily",
      starred: false,
      important: false,
      attachments: 1
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michaelwilson@example.com',
      subject: 'Budget Review',
      date: '1 week ago',
      teaser:
        "It's time for our monthly budget review. I've prepared a summary of our expenses and projections.",
      body: "Hello everyone,\n\nAs we approach the end of the month, it's time for our regular budget review. I've prepared a summary of our expenses and projections for the coming month.\n\nKey points:\n1. We're currently 3% under budget for this month\n2. Marketing expenses were higher than anticipated due to the new campaign\n3. We've seen significant savings in operational costs\n4. Next month's projection shows we may need to allocate more funds to R&D\n\nI've attached the full report for your review. Please take a look and come prepared to discuss any questions or concerns in our budget meeting next week.\n\nBest regards,\nMichael",
      starred: false,
      important: true,
      attachments: 3
    },
    {
      id: 6,
      name: 'Sarah Brown',
      email: 'sarahbrown@example.com',
      subject: 'Team Building Event Ideas',
      date: '1 week ago',
      teaser:
        "I've got some fun ideas for our next team building event. When can we discuss them?",
      body: "Hi team,\n\nI hope you're all having a great week! I've been brainstorming some ideas for our next team building event, and I wanted to share them with you.\n\nHere are a few options I think could be fun and engaging:\n1. Escape room challenge\n2. Cooking class and dinner\n3. Outdoor adventure day (hiking, kayaking, etc.)\n4. Virtual reality gaming session\n5. Charity volunteer day\n\nI think any of these could be a great way for us to bond and boost team morale. I'd love to hear your thoughts and preferences.\n\nCould we set up a quick meeting to discuss these options and decide on the best one for our team?\n\nLooking forward to your input!\n\nBest,\nSarah",
      starred: true,
      important: false,
      attachments: 0
    }
  ]
};

function EmailList({ onSelectEmail }: { onSelectEmail: (mail: (typeof data.mails)[0]) => void }) {
  const [selectedEmail, setSelectedEmail] = React.useState(data.mails[0]);
  const { setOpen } = useSidebar();

  const handleEmailClick = (mail: (typeof data.mails)[0]) => {
    setSelectedEmail(mail);
    onSelectEmail(mail); // Notify parent component of the selection
    setOpen(false);
  };

  return (
    <Sidebar collapsible="none" className="flex w-80 flex-col border-r">
      <SidebarHeader className="border-b">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Inbox</div>
          <NavUser user={data.user} />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <SidebarInput placeholder="Search emails..." className="flex-grow" />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarContent>
          <SidebarGroup className="p-2 w-full">
            <SidebarGroupContent className="grid gap-2">
              {data.mails.map((mail) => (
                <button
                  key={mail.id}
                  onClick={() => handleEmailClick(mail)}
                  className={`flex flex-col items-start gap-1 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring ${
                    selectedEmail.id === mail.id ? 'bg-sidebar-accent' : ''
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium">{mail.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {mail.date}
                    </span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 text-xs text-muted-foreground">
                    {mail.teaser}
                  </span>
                  <div className="mt-1 flex w-full items-center justify-between">
                    {mail.starred ? (
                      <Star className="h-4 w-4 text-yellow-500" />
                    ) : mail.important ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <span className="h-4 w-4" />
                    )}
                    {mail.attachments > 0 && (
                      <span className="text-xs font-medium text-muted-foreground">
                        {mail.attachments} attachment
                        {mail.attachments > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}

function EmailContent({ email }: { email: (typeof data.mails)[0] }) {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow w-full">
          <div className="whitespace-pre-wrap">{email.body}</div>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="flex justify-start space-x-2">
          <Button variant="outline" size="sm">
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <Forward className="mr-2 h-4 w-4" />
            Forward
          </Button>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const [selectedEmail, setSelectedEmail] = React.useState(data.mails[0]);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <EmailList onSelectEmail={setSelectedEmail} />
        <EmailContent email={selectedEmail} />
      </div>
    </SidebarProvider>
  );
}
