'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { StudyTimer } from '@/components/dashboard/study-timer';
import { AIStudyAssistant } from '@/components/ai/study-assistant';
import { AIContentGenerator } from '@/components/ai/content-generator';
import { DashboardAnalytics } from '@/components/dashboard/analytics';
import { LearningResources } from '@/components/dashboard/resources';
import { StudyAssistantPopup } from '@/components/ai/study-assistant-popup';
import { Plus, BarChart2, Brain, Clock, FileText, Layout } from 'lucide-react';
import { Task, TaskStats, taskApi } from '@/lib/api/tasks';
import { toast } from '@/components/ui/use-toast';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as const,
    dueDate: '',
    status: 'not-started' as const,
    progress: 0,
  });

  const fetchTasks = async () => {
    try {
      const [tasksData, statsData] = await Promise.all([
        taskApi.getTasks(),
        taskApi.getStats(),
      ]);
      setTasks(tasksData);
      setStats(statsData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch tasks and stats',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async () => {
    try {
      await taskApi.createTask(newTask);
      setIsAddingTask(false);
      setNewTask({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        dueDate: '',
        status: 'not-started',
        progress: 0,
      });
      fetchTasks();
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await taskApi.updateTask(taskId, {
        status: 'completed',
        progress: 100,
      });
      fetchTasks();
      toast({
        title: 'Success',
        description: 'Task marked as complete',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchTasks();
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Track your progress and stay focused on your learning goals.</p>
        </div>
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to track your learning progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <StudyAssistantPopup />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            icon: Clock, 
            title: 'Study Time', 
            value: `${Math.round((stats?.totalStudyTime || 0) / 60)} hrs`, 
            description: 'Total time' 
          },
          { 
            icon: BarChart2, 
            title: 'Tasks Completed', 
            value: stats?.completed || 0, 
            description: `Out of ${stats?.total || 0}` 
          },
          { 
            icon: Brain, 
            title: 'In Progress', 
            value: stats?.inProgress || 0, 
            description: 'Active tasks' 
          },
          { 
            icon: FileText, 
            title: 'Categories', 
            value: stats?.byCategory.length || 0, 
            description: 'Different subjects' 
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks and Timer Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Tasks</CardTitle>
              <CardDescription>Your active learning tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-4 text-muted-foreground">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">No tasks yet. Create one to get started!</div>
                ) : (
                  tasks.map((task) => (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {task.status !== 'completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCompleteTask(task._id)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <StudyTimer />
          <DashboardAnalytics 
            stats={{
              completedTasks: stats?.completed || 0,
              totalStudyTime: stats?.totalStudyTime || 30,
              streak: 7,
              progress: (stats?.completed || 0) / (stats?.total || 1) * 100,
            }} 
            studyData={[
              { date: '2025-01-07', minutes: 120 },
              { date: '2025-01-06', minutes: 90 },
              { date: '2025-01-05', minutes: 60 },
              { date: '2025-01-04', minutes: 150 },
              { date: '2025-01-03', minutes: 75 },
              { date: '2025-01-02', minutes: 45 },
              { date: '2025-01-01', minutes: 30 }
            ]} 
          />
        </div>

        {/* AI Assistant and Resources Section */}
        <div className="space-y-6">
          <AIStudyAssistant />
          <AIContentGenerator onGenerated={() => fetchTasks()} />
          <LearningResources />
        </div>
      </div>
    </div>
  );
}
